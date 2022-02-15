import express from 'express';
import createValidator from '../validators/validator-middleware.js';
import createPersonSchema from '../validators/create-person.js';
import loginSchema from '../validators/login-validation.js';
import bcrypt from 'bcrypt';
import libraryData from '../data/library-data.js';
import serviceErrors from '../services/service-errors.js';
import { authMiddleware } from '../auth/auth-middleware.js';
import createToken from '../auth/create-token.js'

const usersController = express.Router();

usersController
    /**
     * User log into page route (end point).
     * Logs into site if user is registered and gives valid email and password.
     */
    .post('/register', createValidator(createPersonSchema), async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { username } = req.body;

        const compareUsername = await libraryData.doesUsernameExist('name', username);

        if (compareUsername) {
            await libraryData.regUser(username, hashedPassword);
            res.status(200).json({ message: 'New user was added!' });
        } else {
            res.status(403).json({ message: serviceErrors.DUPLICATE_RECORD });
        }
    })
    /**
     * User log in page route (end point).
     * Logs into site if user is registered and gives valid username and password.
     */
    .post('/session', createValidator(loginSchema), async (req, res) => {
        const { username, password } = req.body;

        const compareNames = await libraryData.doesUsernameExist('name', username);

        if (compareNames) {
            return res.status(400).json({ message: 'Incorrect username!' });
        }

        const userHashedPassword = await libraryData.userHashedPassword('name', username);
        const comparePasswords = await bcrypt.compare(password, userHashedPassword);

        if (!comparePasswords) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }
        const user = await libraryData.userDetails(username);
        const payload = {
            sub: user.id,
            username: user.name,
            role: user.role
        };
        const token = createToken(payload);
        res.status(200).json({ token: token });
        // res.redirect('/library/books');
    })
    /**
     * User log out page route (end point).
     * Logs out from site if it is already logged in.
     */
    .delete('/session', authMiddleware, async (req, res) => {
        req.logout();
        res.redirect('/session');
    })

    /**
     * Root route (end point).
     * Redirects to login page route.
     */
    .get('/', (req, res) => {
        res.redirect('/session');
    })

    /**
     * Login page route (end point).
     * Responses to login page.
     */
    .get('/session', (req, res) => {
        res.status(200).json({ message: 'Login page!' });
    });

export default usersController;