const { body, validationResult } = require('express-validator');
const BudgetModel = require('../../models/budget');

async function deleteBudget(req, res) {
    console.log(req.body.id);
    await body('id').notEmpty().withMessage('Budget ID is required').isMongoId().withMessage('Invalid Budget ID').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.body;
        const deletedBudget = await BudgetModel.findOneAndDelete({ _id: id });
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
