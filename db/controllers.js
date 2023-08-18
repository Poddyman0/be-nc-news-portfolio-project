const { fetchTopics, fetchArticleByID, fetchArticles, fetchArticleComments, createArticleComment, updateArticleByID, removeCommentByID, fetchAllUsers } = require('./models.js')
const endpoints = require('../endpoints.json')

const getApiTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
   res.status(200).send({topics})
}).catch(error => {
    next(error);
});
}
const getAPI = (req, res, next) => {
    res.status(200).send(endpoints)
}
const getArticleByID = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleByID(article_id).then((articles) => {
    res.status(200).send({articles})
    }).catch(error => {
        next(error);
    });
}
const getArticles = (req, res, next) => {
    fetchArticles().then((articles) => {
    res.status(200).send({articles})
    }).catch(error => {
        next(error);
    })
}
const getArticleComments = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleComments(article_id).then((comments) => {
    res.status(200).send({comments})
    }).catch(error => {
        next(error);
    });
}
const setArticleComment = (req, res, next) => {
    const {article_id} = req.params
    const {username, body} = req.body
    createArticleComment(username, body, article_id).then((comments) => {
        res.status(200).send({comments})
    }).catch(error => {
        next(error);
    });
}

const patchArticleByID = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body
    updateArticleByID(inc_votes, article_id).then((articles) => {
        res.status(200).send({articles})
    }).catch(error => {
        next(error)
    })
}

const deleteCommentByID = (req, res, next) => {
    const {comment_id} = req.params
    removeCommentByID(comment_id).then(() => {
        res.status(204).send()
    }).catch(error => {
        next(error)
    })
}

const getAllUsers = (req, res, next) => {
    const {article_id} = req.params
    fetchAllUsers(article_id).then((articles) => {
        res.status(200).send({articles})
    }).catch(error => {
        next(error)
    })
}


    module.exports = {getApiTopics, getAPI, getArticleByID, getArticles, getArticleComments, setArticleComment, patchArticleByID, deleteCommentByID, getAllUsers}

