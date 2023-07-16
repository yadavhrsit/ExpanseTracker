const BudgetModel = require('../../models/budget');

async function deleteBudget(req, res) {
    const { budgetId } = req.body;
    try {
        const deletedBudget = await BudgetModel.findOneAndDelete({ _id: budgetId });
        if (deletedBudget) {
            return res.status(200).json({ message: 'Budget deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Budget not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred during the deletion of the budget' });
    }
}

module.exports = deleteBudget;
