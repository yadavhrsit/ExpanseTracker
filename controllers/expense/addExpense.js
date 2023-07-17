const BudgetModel = require('../../models/budget');
const ExpenseModel = require('../../models/expense');

async function addExpense(req, res) {
    try {
        const { description, amount, categoryId } = req.body;
        const budget = await BudgetModel.findById(categoryId);
        if (!budget) {
            return res.status(400).json({ error: "Expense can't be added without a Budget" });
        }

        if (budget.amount - budget.totalExpenses < 0) {
            return res.status(400).json({ error: "Expense exceeds the Budget" });
        }

        const expense = {
            description,
            amount,
            categoryId,
            category: budget.name
        };

        const newExpense = new ExpenseModel(expense);
        await newExpense.save();
        await BudgetModel.findByIdAndUpdate(categoryId, { $inc: { totalExpenses: amount } });

        return res.status(201).json({ success: 'Expense Added Successfully' });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during the addition of the Expense" });
    }
}

module.exports = addExpense;
