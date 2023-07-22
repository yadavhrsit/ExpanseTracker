const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ExpenseModel = require('../../models/expense');

async function viewExpense(req, res) {
    try {
        const expenseId = req.params.expenseId;
        const errors = validationResult(req);
        if (!mongoose.Types.ObjectId.isValid(expenseId) || !errors.isEmpty()) {
            return res.status(400).json({ error: "Invalid Expense ID" });
        }

        const expense = await ExpenseModel.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        return res.status(200).json(expense);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during opening the Expense" });
    }
}

module.exports = viewExpense;
