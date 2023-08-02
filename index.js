const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
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
const Port = 8000;
const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.7:3000'];

app.set('trust proxy', 1);

app.use(cors(

    {
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
    }

));

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

mongoose.connect(process.env.DB).then(() => {
    console.log("MongoDB Connected")
}).catch(() => {
    console.log("MongoDB Failed to connect");
})

app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        store: new MongoStore({ mongoUrl: process.env.DB }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,

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




app.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`);
});

module.exports.api = functions.https.onRequest(app);
