const db = require('./connection');

const fetchTopics = () => {
    const baseSQLStr = `SELECT * FROM topics;`
    return db.query(baseSQLStr)
        .then(({ rows }) => {
            return rows;
        })
};

const fetchArticleByID = (article_id) => {
    return db
        .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
        .then(({ rows }) => {
        const article = rows[0];
        if (!article) {
            return Promise.reject({
                status: 404,
                msg: 'article_id does not exist in databse'
            })
        }
        return user
      })
};

/*
const getAPIArticles = () => {
    return db.query(endPointsFile)
        .then(() => {
            const JSONFilePath = '../endpoints.json' 
            const articlesArr = []
            
        })
}
const processedArticles = () => {
function processEndpointsFile(filePath) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const endpoint = jsonData['GET /api/articles'];

        if (!endpoint || !endpoint.exampleResponse) {
            throw new Error('Invalid JSON structure or missing data');
        }
    } catch (error) {
        throw new Error('Error processing JSON file:', error);
    }
}
processedEndpointsFile()
    'ALTER TABLE comments ADD comment_count INT DEFAULT 0;';
    let queryStr = 'SELECT * FROM comments'
}
processedArticles()
const endpointsFilePath = '../endpoints.json';

const getArticleComments = () => {

}
*/

module.exports = { fetchTopics, fetchArticleByID, /*processedArticles, getArticleComments*/};
