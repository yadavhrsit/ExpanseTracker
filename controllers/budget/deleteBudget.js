const { body, validationResult } = require('express-validator');
const BudgetModel = require('../../models/budget');

async function deleteBudget(req, res) {
    await body('budgetId').notEmpty().withMessage('Budget ID is required').isMongoId().withMessage('Invalid Budget ID').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { budgetId } = req.body;
        const deletedBudget = await BudgetModel.findOneAndDelete({ _id: budgetId });
        if (deletedBudget) {
            return res.status(204).json({ message: 'Budget deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Budget not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete the budget' });
    }
}

module.exports = deleteBudget;
