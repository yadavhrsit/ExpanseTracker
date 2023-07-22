const { validationResult, check } = require('express-validator');
const BudgetModel = require('../../models/budget');

async function viewBudget(req, res) {
    try {
        await check('budgetId').isMongoId().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const budgetId = req.params.budgetId;
        const budget = await BudgetModel.findById(budgetId);

        if (!budget) {
            return res.status(404).json({ error: "Budget not found" });
        }

        return res.status(200).json({ budget, remainingAmount: budget.amount - budget.totalExpenses });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve the budget" });
    }
}

module.exports = viewBudget;
