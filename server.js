const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const AuthRouter = require("./routes/authRoutes");
const BudgetRouter = require("./routes/budgetRoutes");
const ExpenseRouter = require("./routes/expenseRoutes");

const app = express();
const Port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', AuthRouter);
app.use('/budget', BudgetRouter);
app.use('/expense', ExpenseRouter);
app.use('/', (req, res) => {
    res.send("Server is Working");
});

app.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`);
});

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("DB Connection Failed:", error);
    });
