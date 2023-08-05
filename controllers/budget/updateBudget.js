const { body, validationResult } = require('express-validator');
const BudgetModel = require('../../models/budget');

async function updateBudget(req, res) {
    await body('id').notEmpty().withMessage('Budget ID is required').isMongoId().withMessage('Invalid Budget ID').run(req);
    await body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
