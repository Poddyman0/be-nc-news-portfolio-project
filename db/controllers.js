const { fetchTopics, fetchArticleByID, readArticleID, processedArticles, getArticleComments} = require('./models.js')
const endpoints = require('../endpoints.json')

const getApiTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
   res.status(200).send({topics})
}).catch(error => {
    next(error);
});
}
const getAPI = (req, res, next) => {
    res.status(200).send({endpoints})
}
const getArticleByID = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleByID(article_id).then((articles) => {
    res.status(200).send({articles})
    }).catch(error => {
        next(error);
    });
}
/*
const readArticleID = (req, res) => {
    readAPI().then((endpointAuthor) => {
   res.status(200).send({endpointAuthor})
})
}
const processedArticles = (req, res) => {
    processedArticles().then((endpointArticle) => {
   res.status(200).send({endpointAticle})
})
}
const getArticleComments = (req, res) => {
    getArticleComments().then((endpointArticle) => {
   res.status(200).send({endpointAticle})
})
}
*/


module.exports = {getApiTopics, getAPI, getArticleByID/* readArticleID, processedArticles, getArticleComments */}