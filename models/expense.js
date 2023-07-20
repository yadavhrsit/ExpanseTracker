const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expense = new Schema({
    date: { type: Date, default: Date.now },
    description: String,
    amount: Number,
    budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: String,
});
const ExpenseModel = mongoose.model('Expense', Expense);

module.exports = ExpenseModel;
