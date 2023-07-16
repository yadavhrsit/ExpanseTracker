const BudgetModel = require('../../models/budget');

async function viewBudget(req, res) {
    try {
        let id = req.body.id;
        const budget = await BudgetModel.findById(id);
        if (budget) {
            remainingAmount = budget.amount - budget.totalExpenses;
            res.json({ budget, remainingAmount });
        }
        else {
            res.status(500).json({ error: "Budget not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "An error occurred during the Budget View" });
    }
}

module.exports = viewBudget;