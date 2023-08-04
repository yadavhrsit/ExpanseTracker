const { body, validationResult } = require('express-validator');
const BudgetModel = require('../../models/budget');

async function addBudget(req, res) {
    try {
        await body('name').notEmpty().withMessage('Name is required').run(req);
        await body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, amount } = req.body;
        const user = req.session.userId;
        const budget = new BudgetModel({ user, name, amount, totalExpenses: 0 });
        await budget.save();
        return res.status(201).json({ success: 'Budget Added Successfully' });
    } catch (err) {
        return res.status(500).json({ error: "An error occurred during the addition of the budget", err });
    }
}

module.exports = addBudget;
