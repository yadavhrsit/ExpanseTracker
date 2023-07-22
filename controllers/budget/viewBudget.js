const BudgetModel = require('../../models/budget');

async function viewBudget(req, res) {
    try {
        const id = req.params.budgetId;
        const budget = await BudgetModel.findById(id);
        if (!budget) {
            return res.status(404).json({ error: "Budget not found" });
        }
        return res.status(200).json({ budget, remainingAmount: budget.amount - budget.totalExpenses });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve the budget" });
    }
}

module.exports = viewBudget;
