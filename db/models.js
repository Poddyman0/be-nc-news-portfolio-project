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
                msg: 'article_id does not exist in databse',
            })
        }
        return article
      })
};
const fetchArticles = () => {
    return db
        .query(`
        SELECT * EXCEPT (body) FROM articles
        COUNT(comments.article_id)::INT AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC;`)
        .then(({ rows }) => {
            return rows;
        })
}
const fetchArticleComments = (article_id) => {
    return db
        .query(`SELECT *
        FROM articles
        WHERE article_id = $1;`, [article_id])
        .then(({rows}) => {
            const article = rows[0];
            if (!article) {
                return Promise.reject({
                    status: 404,
                    msg: 'article_id does not exist in databse',
            })} else {
    return db
        .query(`SELECT *
        FROM comments
        WHERE article_id = $1;`, [article_id])
        .then(({rows}) => {
            return rows[0];
        }) 
}})}

const createArticleComment = (username, body) => {
    return db
        .query(`INSERT INTO comments (username, body)
        VALUES ($1, $2)`, [username, body])
    .then(({ rows }) => {
    const comment = rows[0];
    if (!comment) {
    return Promise.reject({
        status: 404,
        msg: 'username or body does not exist in databse',
    })
    }
    return comment
    })
}

const updateArticleByID = (article_id, inc_votes) => {
    const SQLStr = `
    SELECT *
    FROM articles
    WHERE article_id = $1
     `
    if (inc_votes.newVote > 0) {
        SQLStr += `UPDATE articles SET votes = votes + $2;`
    } else if (inc_votes.newVote < 0) {
        SQLStr += `UPDATE articles SET votes = votes - $2;`
    }
    return db
        .query(SQLStr, [article_id, inc_votes])
    .then(({ rows }) => {
    const article = rows[0]
    if (!article) {
    return Promise.reject({
        status: 404,
        msg: 'username or body does not exist in databse',
    })
    }
    return comment
    })    
}
const removeCommentByID = (comment_id) => {
    return db
    .query(`UPDATE comments
    SET 
        body = NULL,
        votes = NULL,
        author = NULL,
        article_id = NULL,
        created_at = NULL,
        article_img_url = NULL,
        comment_id = NULL,
    WHERE comments = $1;`, [comment_id])
    .then(({ rows }) => {
        const comment = rows[0]
        if (!comment) {
        return Promise.reject({
            status: 204,
            msg: 'no content',
        })
        }
        return comment
        })    
    }

    const fetchAllUsers = () => {
        return db
        .query(`SELECT * FROM users;`)
        .then(({ rows }) => {
            return rows;
        })
    }


    module.exports = { fetchTopics, fetchArticleByID, fetchArticles, fetchArticleComments, createArticleComment, updateArticleByID, removeCommentByID };
