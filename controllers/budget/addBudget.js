const BudgetModel = require('../../models/budget');

async function addBudget(req, res) {
    try {
        const { name, amount } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Unable to get the required data - Name" });
        }
        if (!amount) {
            return res.status(400).json({ error: "Unable to get the required data - Amount" });
        }
        const budget = new BudgetModel({ name, amount, totalExpenses: 0 });
        await budget.save();
        return res.status(201).json({ success: 'Budget Added Successfully' });
    } catch (err) {
        return res.status(500).json({ error: "An error occurred during the addition of the budget" });
    }
}

module.exports = addBudget;
