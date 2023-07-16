const BudgetModel = require('../../models/budget');
const ExpenseModel = require('../../models/expense');

async function addExpense(req, res) {
    try {
        const { description, amount, categoryId } = req.body;

        const budget = await BudgetModel.findById(categoryId);
        if (!budget) {
            return res.json("Expense can't be added without a Budget");
        }

        if (budget.amount - budget.totalExpenses >= 0) {
            const expense = {
                description: description,
                amount: amount,
                categoryId: categoryId,
                category: budget.name
            };

            const newExpense = new ExpenseModel(expense);
            budget.totalExpenses += amount;

            await budget.save();
            await newExpense.save();

            return res.json('Expense Added Successfully');
        } else {
            return res.json('Expense Exceeds Budget');
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during adding of Expense" });
    }
}

module.exports = addExpense;
