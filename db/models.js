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
        SELECT 
        articles.article_id,
        articles.title,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.author,
        articles.article_img_url,
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
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC;`, [article_id])
        .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'username or body does not exist in databse',
            })
        }
        return rows;
})}

const createArticleComment = (username, body, article_id) => {
    return db
        .query(`INSERT INTO comments (author, body, article_id)
        VALUES ($1, $2, $3) RETURNING *;`, [username, body, article_id])
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

const updateArticleByID = (inc_votes, article_id) => {
    const SQLStr = `
    UPDATE articles SET votes = votes + $1
    WHERE articles.article_id = $2 RETURNING *;`
    return db.query(SQLStr, [inc_votes, article_id])
    .then(({ rows }) => {
    const article = rows[0]
    if (!article) {
    return Promise.reject({
        status: 404,
        msg: 'username or body does not exist in databse',
    })
    }
    return article
    })    
}
const removeCommentByID = (comment_id) => {
    return db
    .query(`DELETE FROM comments
    WHERE comment_id = $1;`, [comment_id])
    .then(( response ) => {
        if (response.rowCount === 0) {
        return Promise.reject({
            status: 404,
            msg: 'article does not exist in database',
        })
        }
        return response.rows
        })   
    }

    const fetchAllUsers = () => {
        return db
        .query(`SELECT * FROM users;`)
        .then(({ rows }) => {
            return rows;
        })
    }


    module.exports = { fetchTopics, fetchArticleByID, fetchArticles, fetchArticleComments, createArticleComment, updateArticleByID, removeCommentByID, fetchAllUsers };
