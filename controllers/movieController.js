const dbConnection = require('../data/dbConnection')

const index = (req, res) => {
    const filters = req.query
    console.log(filters)

    let sql = `SELECT * FROM movies`
    const params = []

    if (filters.search) {
        sql += `
        WHERE title LIKE ?
        `
        params.push(`%${filters.search}%`)
    }

    dbConnection.query(sql, params, (err, movies) => {
        if (err) {
            const resObj = {
                status: 'Fail',
                message: 'Internal server error'
            }
            if (process.env.ENVIRONMENT === 'development') {
                resObj.detail = err.stack;
            }

            return res.status(500).json(resObj)
        }

        return res.status(200).json({
            status: 'Success',
            data: movies,
        })
    });


};

const show = (req, res) => {
    const id = req.params.id

    const sql = `
    SELECT movies.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
    FROM movies
    LEFT JOIN reviews
    ON reviews.movie_id = movies.id
    WHERE movies.id = ?
    `

    const sqlReviews = `
    SELECT * 
    FROM reviews 
    JOIN movies 
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `

    dbConnection.query(sql, [id], (err, results) => {
        if (err) {
            const resObj = {
                status: 'Fail',
                message: 'Internal server error'
            }
            if (process.env.ENVIRONMENT === 'development') {
                resObj.detail = err.stack;
            }

            return res.status(500).json(resObj)
        }

        if (results.length === 0 || results[0].id === null) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Film non trovato',
            })
        }

        dbConnection.query(sqlReviews, [id], (err, reviews) => {
            if (err) {
                const resObj = {
                    status: 'Fail',
                    message: 'Internal server error'
                }
                if (process.env.ENVIRONMENT === 'development') {
                    resObj.detail = err.stack;
                }

                return res.status(500).json(resObj)
            }

            return res.status(200).json({
                status: 'Success',
                data: {
                    ...results[0],
                    reviews
                }
            })
        })


    })
};

module.exports = {
    index,
    show,
};