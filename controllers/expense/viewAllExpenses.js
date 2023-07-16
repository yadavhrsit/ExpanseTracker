const ExpenseModel = require('../../models/expense');

async function viewAllExpenses(req, res) {
    try {
        const expenses = await ExpenseModel.find({});
        if (!expenses.length) {
            return res.json("No Expenses found");
        }
        return res.json(expenses);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during getting all the Expenses" });
    }
}

module.exports = viewAllExpenses;