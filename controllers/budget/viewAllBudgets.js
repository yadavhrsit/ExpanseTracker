const { validationResult, query } = require('express-validator');
const BudgetModel = require('../../models/budget');

async function viewAllBudgets(req, res) {
    await query('page').optional().isInt().withMessage('Invalid page number').toInt().run(req);
    await query('limit').optional().isInt().withMessage('Invalid limit value').toInt().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const budgets = await BudgetModel.find({ user: req.session.userId }).skip(skip).limit(limit);
        return res.status(200).json(budgets);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving all the budgets" });
    }
}

module.exports = viewAllBudgets;
