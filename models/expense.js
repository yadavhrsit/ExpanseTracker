const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Budget = require('./budget');

const Expense = new Schema({
    date: { type: Date, default: Date.now },
    description: String,
    amount: Number,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Budget
    },
    category: String,
});

const ExpenseModel = mongoose.model('Expense', Expense);

module.exports = ExpenseModel;