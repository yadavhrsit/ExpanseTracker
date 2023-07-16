const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Budget = new Schema({
    name: String,
    amount: Number,
    totalExpenses: Number,
})

const budgetModel = mongoose.model('Budget', Budget);
module.exports = budgetModel;