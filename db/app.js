const express = require('express')
const {getApiTopics, getAPI, getArticleByID, processedArticles} = require('./controllers.js');
const app = express();

app.use(express.json())

app.get('/api/topics', getApiTopics)

app.get('/api', getAPI)

app.get('/api/articles/:article_id', getArticleByID)

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: 'article_id does not exist in databse'})
    }
    else if (err.code === "22P02") {
    res.status(400).send({msg: 'Invalid input'})
    }
    else {
    res.status(500).send("server error getting API")
    }
})


/*

app.get('/api/articles/:article_id/comments', (req, res) => {
    res.send(getArticleComments)
    res.status(200).send({ msg: 'Getting API article comments' })
})
*/
module.exports = app;
