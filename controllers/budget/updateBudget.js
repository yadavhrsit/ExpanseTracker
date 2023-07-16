const BudgetModel = require('../../models/budget');

async function updateBudget(req, res) {
    try {
        let id = req.body.id;
        let amount = req.body.amount;
        const budget = await BudgetModel.findById(id);
        if (budget) {
            budget.amount = amount;
            await budget.save();
            res.json('Budget Updated Successfully');
        }
        else {
            res.status(404).json({ error: "Budget not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "An error occurred during the update of the budget" });
    }
}

module.exports = updateBudget;
