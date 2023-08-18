const express = require('express')
const {getApiTopics, getAPI, getArticleByID, getArticles, getArticleComments, setArticleComment, patchArticleByID, deleteCommentByID, getAllUsers } = require('./controllers.js');
const app = express();

app.use(express.json())

app.get('/api/topics', getApiTopics)

app.get('/api', getAPI)

app.get('/api/articles/:article_id', getArticleByID)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', setArticleComment)

app.patch('/api/articles/:article_id', patchArticleByID)

app.delete('/api/comments/:comment_id', deleteCommentByID)

app.get('/api/users', getAllUsers)

app.use((req, res) => {
    res.status(404).send({msg: 'not found'})
})

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: 'article_id does not exist in databse'})
    }
    else next(err)
})

app.use((err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23503") {
        res.status(400).send({msg: 'Invalid input'})
    } else if (err.code === "23502") {
        res.status(404).send({msg: 'article_id does not exist in databse'})
    }
    else next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'server error getting API'})
})

module.exports = app;
