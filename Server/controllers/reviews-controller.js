import express from 'express';
import { authMiddleware } from '../auth/auth-middleware.js';
import libraryData from '../data/library-data.js';
import createValidator from '../validators/validator-middleware.js';
import reviewsValidation from '../validators/reviews-validation.js';
import updateReviewsValidation from '../validators/edit-reviews-validation.js'

const reviewsController = express.Router();

reviewsController
    /**
     * Read book reviews (end point).
     * Gives response with all reviews from a single book.
     */
    .get('/library/books/:id/reviews', authMiddleware, async (req, res) => {
        const { id } = req.params;
        const reviews = await libraryData.getReviewsFromBook(id);

        if (!id) {
            res.status(404).json({ massage: 'There is not such a book with this id!' });
        } else {
            res.status(200).json(reviews);
        }
    })

    /**
     * Create book review (end point).
     * Requires text and user provided in the body
     * Adds a new review to a given book.
     */
    .post('/library/books/:id/reviews', authMiddleware, createValidator(reviewsValidation), async (req, res) => {
        const { id } = req.params;
        const { text } = req.body;
        const { user } = req.body;
        const compare = await libraryData.doesUsernameExist('id', user);

        if (!text || !user || compare.length == 0 || (text.length < 2 || text.length > 200)) {
            res.status(400).json({ massage: 'Invalid user or content!' })
        }
        else {
            await libraryData.createReview(text, user, id);
            const reviews = await libraryData.getReviewsFromBook(id);
            res.status(200).json(reviews);
        }
    })

    /**
     * UPDATE book review (end point).
     * Requires text field in the body
     * Modifies a review to a given book.
     */
    .put('/library/books/:id/reviews/:reviewsId', authMiddleware, createValidator(updateReviewsValidation), async (req, res) => {
        const { id, reviewsId } = req.params;
        const { text, user } = req.body;

        const book = await libraryData.getBy('id', id);
        const currentReview = await libraryData.getReviewBy('id', reviewsId);
        const compareNames = await libraryData.doesUsernameExist('name', user);

        if (!id || !book) {
            return res.status(404).json({ massage: 'Book not found!' });
        }
        if (!currentReview || currentReview.length === 0) {
            return res.status(404).json({ massage: 'Review not found!' });
        }
        if (compareNames.length === 0) {
            return res.status(400).json({ message: 'Invalid user!' });
        }
        if (!text || text.length < 2 || text.length > 200) {
            return res.status(400).json({ massage: 'Review must be between 2 and 200 characters!' });
        }

        await libraryData.updateReview(text, reviewsId);

        res.status(200).json({ message: 'Review updated!', ...currentReview });
    })

    /**
     * DELETE book review (end point).
     * Deletes a review from a given book.
     */
    .delete('/library/books/:id/reviews/:reviewsId', authMiddleware, async (req, res) => {
        const { id, reviewsId } = req.params;

        const book = await libraryData.getBy('id', id);
        const currentReview = await libraryData.getReviewBy('id', reviewsId);

        if (!id || !book) {
            return res.status(404).json({ massage: 'Book not found!' });
        }
        if (!currentReview || currentReview.length === 0) {
            return res.status(404).json({ massage: 'Review not found!' });
        }

        await libraryData.deleteReview(reviewsId);

        res.status(200).json({ message: 'Review deleted!', ...currentReview });
    });

export default reviewsController;