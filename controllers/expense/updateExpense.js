const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ExpenseModel = require('../../models/expense');
const BudgetModel = require('../../models/budget');

async function updateExpense(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { expenseId, description, amount, budgetId } = req.body;
        await check('amount').optional().isNumeric().toFloat().run(req);
        await check('description')
            .optional()
            .custom((value) => {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 100) {
                    throw new Error('Description should be maximum 100 words');
                }
                return true;
            })
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const expense = await ExpenseModel.findById(expenseId).session(session);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        if (description != null) {
            expense.description = description;
        }
        if (amount != null && expense.amount !== amount) {
            expense.amount = amount;
        }
        if (budgetId) {
            const newBudgetToAssign = await BudgetModel.findById(budgetId).session(session);
            if (!newBudgetToAssign) {
                return res.status(404).json({ error: "Budget not found" });
            }
            if (budgetId !== expense.budgetId) {
                expense.budgetId = await budgetId;
                expense.category = newBudgetToAssign.name;
            }
        }

        await expense.save();
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ success: 'Expense Updated Successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ 'error-': "An error occurred during updating the Expense", error });
    }
}

module.exports = updateExpense;
