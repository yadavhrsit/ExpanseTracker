const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./middlewares/passport.js');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cors = require('cors');
const functions = require('firebase-functions');

dotenv.config();

const AuthRouter = require('./routes/authRoutes.js');
const BudgetRouter = require('./routes/budgetRoutes.js');
const ExpenseRouter = require('./routes/expenseRoutes.js');
const UtilRoutesNoAuth = require('./routes/utilRoutes.js');

const app = express();
const Port = 3000;
const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.7:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders:
        "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, x-access-token",
}));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    },
    reportOnly: false,
    xContentTypeOptions: true,
    frameguard: { action: 'sameorigin' },
    xssFilter: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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

const loadDatabase = async () => {
    const { connectToDatabase, connectToRedis, redisStore } = await import('./db.mjs');
    app.use(
        session({
            store: redisStore,
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    connectToDatabase().then(() => {
        connectToRedis().then(() => {
            app.listen(Port, () => {
                console.log(`Server Started on Port ${Port}`);
            });
        });
    });
};

loadDatabase();

module.exports.api = functions.https.onRequest(app);
