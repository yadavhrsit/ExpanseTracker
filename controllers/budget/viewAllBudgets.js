const budgetModel = require('../../models/budget');

async function viewAllBudgets(req, res) {
    try {
        const budgets = await budgetModel.find({});
        if (!budgets) {
            return res.json("No Budgets found");
        }
        return res.json(budgets);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during getting all the Budgets" });
    }
}

module.exports = viewAllBudgets;