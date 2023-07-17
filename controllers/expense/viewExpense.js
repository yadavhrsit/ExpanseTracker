const ExpenseModel = require('../../models/expense');

async function viewExpense(req, res) {
    try {
        const { expenseId } = req.body;
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
