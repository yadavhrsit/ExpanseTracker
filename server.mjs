import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { connectToDatabase, connectToRedis, redisStore } from './db.mjs';
import session from 'express-session';
import passport from './middlewares/passport.js';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import AuthRouter from './routes/authRoutes.js';
import BudgetRouter from './routes/budgetRoutes.js';
import ExpenseRouter from './routes/expenseRoutes.js';
import UtilRoutesNoAuth from './routes/utilRoutes.js';

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    },
    reportOnly: false,
    xContentTypeOptions: true,
    frameguard: { action: 'sameorigin' },
    xssFilter: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        store: redisStore,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 },
    })
);

app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});

app.use('/auth', limiter);
app.use('/budget', limiter);
app.use('/expense', limiter);

app.use('/auth', AuthRouter);
app.use('/budget', BudgetRouter);
app.use('/expense', ExpenseRouter);

app.use('/utils', UtilRoutesNoAuth);

app.get('/', (req, res) => {
    res.send('Server is Working');
});

connectToDatabase().then(() => {
    connectToRedis().then(() => {
        app.listen(Port, () => {
            console.log(`Server Started on Port ${Port}`);
        });
    })
})




