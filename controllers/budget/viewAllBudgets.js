const BudgetModel = require('../../models/budget');

async function viewAllBudgets(req, res) {
    try {
        const budgets = await BudgetModel.find({ user: req.body.userId });
        if (budgets.length === 0) {
            return res.status(404).json({ error: "No budgets found" });
        }
        return res.status(200).json(budgets);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving all the budgets" });
    }
}

module.exports = viewAllBudgets;
