const BudgetModel = require('../../models/budget');

async function deleteBudget(req, res) {
    const { budgetId } = req.body;
    try {
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
