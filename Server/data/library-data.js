import pool from './pool.js';

const getAll = async () => {
    const sql = `
        SELECT *
        FROM books
    `;

    return await pool.query(sql);
};

const searchBy = async (column, value) => {
    const sql = `
        SELECT *
        FROM books
        WHERE ${column} LIKE '%${value}%'
    `;

    return await pool.query(sql)
}

const getBy = async (column, value) => {
    const sql = `
        SELECT id, title, author, is_borrowed, unlisted, img, users_id
        FROM books
        WHERE ${column} = ?
    `;

    const result = await pool.query(sql, [value]);
    return result[0];
}

const getBook = async (userId, bookId) => {
    const sql = `
        UPDATE books
        SET users_id = ?
        WHERE id = ?;
    `;
    const result = await pool.query(sql, [userId, bookId]);
    return result;
}

const returnBook = async (value) => {
    const sql = `
    UPDATE books
    SET users_id = NULL
    WHERE id = ?;
    `;

    const result = await pool.query(sql, [value]);
    return result;
}

const userDetails = async (username) => {
    const sql = `
        SELECT id, name, password
        FROM users
        WHERE name = ?
    `;

    const result = await pool.query(sql, [username]);
    return result[0];
}

const regUser = async (username, password) => {
    const sql = `
        INSERT INTO users (name, password)
        VALUES(?, ?);
    `;
    const result = await pool.query(sql, [username, password]);
    return result;
}

const doesUsernameExist = async (column, input) => {
    const sql = `
    SELECT id, name 
    FROM users
    WHERE ${column} = ?; 
    `;

    const result = await pool.query(sql, [input]);

    if (result.length == 0) {
        return true;
    } else {
        return false;
    }
}

const userHashedPassword = async (column, input) => {
    const sql = `
    SELECT password
    FROM users
    WHERE ${column} = ?;
    `;
    const result = await pool.query(sql, [input]);
    return result[0].password;
}

const getReviewBy = async (reviewsColumn, reviewsId) => {
    const sql = `
    SELECT reviews.id, reviews.text, users.name
    FROM reviews
    JOIN users
    ON reviews.users_id = users.id
    WHERE reviews.${reviewsColumn} = ?;
    `;

    const result = await pool.query(sql, [reviewsId]);
    return result[0];
}

const getReviewsFromBook = async (bookId) => {
    const sql = `
    SELECT reviews.id, reviews.text, users.name
    FROM books
    JOIN reviews
    ON reviews.books_id = books.id
    JOIN users
    ON reviews.users_id = users.id
    WHERE books.id = ?;
    `;

    const result = await pool.query(sql, [bookId]);
    return result;
};

const createReview = async (text, userId, bookId) => {
    const sql = `
        INSERT INTO reviews (text, users_id, books_id)
        VALUES(?, ?, ?);
    `;

    const result = await pool.query(sql, [text, userId, bookId]);
    return result;
};

const updateReview = async (text, reviewsId) => {
    const sql = `
        UPDATE reviews
        SET text = ?
        WHERE id = ?;
    `;

    const result = await pool.query(sql, [text, reviewsId]);

    return result;
}

const deleteReview = async (reviewsId) => {
    const sql = `
        DELETE FROM reviews
        WHERE id = ?;
    `;

    return await pool.query(sql, [reviewsId]);
}

const setBookRating = async (rate, books_id) => {
    const sql = `
        INSERT INTO ratings (rate, books_id)
        VALUES(?, ?);
    `;

    const result = await pool.query(sql, [rate, books_id]);
    return result;
};

const getBookRating = async (books_id) => {
        const sql = `
        SELECT rate 
        FROM ratings 
        WHERE books_id = ?;
    `;

    const result = await pool.query(sql, [books_id]);
    return result;
};



export default {
    getAll,
    searchBy,
    getBy,
    getBook,
    returnBook,
    userDetails,
    regUser,
    doesUsernameExist,
    getReviewBy,
    getReviewsFromBook,
    createReview,
    updateReview,
    userHashedPassword,
    deleteReview,
    setBookRating,
    getBookRating
}