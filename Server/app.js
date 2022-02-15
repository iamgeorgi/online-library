import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import usersController from './controllers/users-controller.js';
import booksController from './controllers/books-controller.js';
import reviewsController from './controllers/reviews-controller.js';
import { PORT } from './config.js';

const app = express();
passport.use(jwtStrategy);
app.use(cors(), bodyParser.json());
app.use(passport.initialize());
app.use(usersController);
app.use(booksController);
app.use(reviewsController);

app.use((err, req, res, next) => {
    // logger.log(err)

    res.status(500).send({
        message: 'An unexpected error occurred, our developers are working hard to resolve it.'
    });
});

app.all('*', (req, res) =>
    res.status(404).send({ message: 'Resource not found!' })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));