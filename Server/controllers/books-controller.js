import express from 'express';
import { authMiddleware } from '../auth/auth-middleware.js';
// import createValidator from '../validators/validator-middleware.js';
import libraryData from '../data/library-data.js';
import _ from 'lodash';

const booksController = express.Router();

booksController
    /**
     * Retrieves all books from library route (end point).
     * Gives response to the request for all the books from the library.
     */
    .get('/library/books', authMiddleware, async (req, res) => {
        const { search } = req.query;
        let bookTitles;
        if (search) {
            bookTitles = await libraryData.searchBy('title', search);
        } else {
            bookTitles = await libraryData.getAll();
        }
        res.status(200).json(bookTitles);
    })

    /**
     * View individual book route (end point).
     * Gives response with the book that is requested.
     */
    .get('/library/books/:id', authMiddleware, async (req, res) => {
        const { id } = req.params;
        const book = await libraryData.getBy('id', id);

        if (!(_.isEmpty(req.query))) {
            await libraryData.setBookRating(req.query.rate, id);
        }
        const bookRating = await libraryData.getBookRating(id);
        
        if (bookRating[0]) {
            const rateArray = bookRating.map(e => e.rate);
            const sumRateArray = rateArray.reduce((a, b) => a + b, 0);
            const result = Math.round(sumRateArray / rateArray.length);
            book.rate = result;
        }

        if (!book) {
            return res.status(404).json({ message: 'Book not found!' });
        }
        res.status(200).json(book);
    })

    /**
     * Borrow a book route (end point).
     * Accepts user_id as Body property.
     * Response to borrow a requested book.
     */
    .post('/library/books/:id', authMiddleware, async (req, res) => {
        const { id } = req.params;
        const { userId } = req.body;
        const book = await libraryData.getBy('id', id);
        // console.log(userId);
        // res.status(200).json(userId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found!' });
        } else if (userId == book.users_id) {
            return res.status(404).json({ message: 'You already bought this book!' });
        } else if (book.users_id) {
            return res.status(404).json({ message: 'Book is already taken!' });
        } else {
            await libraryData.getBook(userId, id);
            res.status(200).json({ message: 'You just borrowed a new book!' });
        }
    })

    /**
     * Return a book route (end point).
     * Response to return a requested book.
     */
    .delete('/library/books/:id', authMiddleware, async (req, res) => {
        const { id } = req.params;
        const book = await libraryData.getBy('id', id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found!' });
        }

        await libraryData.returnBook(id);
        res.status(200).json({ message: 'Book is returned' });
    });

export default booksController;