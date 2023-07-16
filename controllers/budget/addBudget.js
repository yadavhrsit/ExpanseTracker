const BudgetModel = require('../../models/budget');

async function addBudget(req, res) {
    try {
        let name = req.body.name;
        let amount = req.body.amount;
        const budget = {
            name: name,
            amount: amount,
            totalExpenses: 0
        };
        const Budget = new BudgetModel(budget);
        await Budget.save();
        res.json('Budget Added Successfully');
    } catch (err) {
        res.status(500).json({ error: "An error occurred during adding of Budget" });
    }
}
module.exports = addBudget;