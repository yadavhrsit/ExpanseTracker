const BudgetModel = require('../../models/budget');

async function updateBudget(req, res) {
    try {
        const { id, amount } = req.body;

        const budget = await BudgetModel.findById(id);
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        budget.amount = amount;
        await budget.save();

        return res.status(200).json({ success: 'Budget Updated Successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred during the update of the budget' });
    }
}

module.exports = updateBudget;
