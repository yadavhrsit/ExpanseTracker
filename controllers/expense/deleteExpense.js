const mongoose = require('mongoose');
const ExpenseModel = require('../../models/expense');
const BudgetModel = require('../../models/budget');

async function deleteExpense(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { expenseId } = req.body;
        const expense = await ExpenseModel.findById(expenseId).session(session);

        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        const { categoryId, amount } = expense;

        await BudgetModel.findByIdAndUpdate(categoryId, { $inc: { totalExpenses: -amount } }, { session });

        await ExpenseModel.deleteOne({ _id: expenseId }).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ success: 'Expense Deleted Successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error occurred during deleting the Expense:", error);
        return res.status(500).json({ error: "An error occurred during deleting the Expense" });
    }
}

module.exports = deleteExpense;
