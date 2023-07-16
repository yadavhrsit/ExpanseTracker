const ExpenseModel = require('../../models/expense');

async function deleteExpense(req, res) {
    try {
        const { expenseId } = req.body;
        const expense = await ExpenseModel.findById(expenseId);

        if (!expense) {
            return res.json("Expense not found");
        }

        await expense.remove();

        return res.json('Expense Deleted Successfully');
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during deleting the Expense" });
    }
}

module.exports = deleteExpense;
