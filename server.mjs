import express from 'express';
import bodyParser from 'body-parser';
import connectToDatabase from './db.js';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import passport from './middlewares/passport.js';
import dotenv from 'dotenv';

dotenv.config();

import AuthRouter from './routes/authRoutes.js';
import BudgetRouter from './routes/budgetRoutes.js';
import ExpenseRouter from './routes/expenseRoutes.js';

const app = express();
const Port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect().then(() => {
    console.log("Redis server is Running and Connected to Database");
}).catch((error) => {
    console.error("Redis Connection Failed:", error);
})

let redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
});

app.use(
    session({
        store: redisStore,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: false, maxAge: 1000 * 60 * 30 },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', AuthRouter);
app.use('/budget', BudgetRouter);
app.use('/expense', ExpenseRouter);

app.get('/', (req, res) => {
    res.send('Server is Working');
});

connectToDatabase()
    .then(() => {
        app.listen(Port, () => {
            console.log(`Server Started on Port ${Port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
