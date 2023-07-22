const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const BudgetModel = require('../../models/budget');
const ExpenseModel = require('../../models/expense');

async function addExpense(req, res) {
    await body('description').notEmpty().withMessage('Description is required').run(req);
    await body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number').run(req);
    await body('budgetId').notEmpty().withMessage('Budget ID is required').isMongoId().withMessage('Invalid Budget ID').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { description, amount, budgetId } = req.body;
        const user = req.session.userId;
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const budget = await BudgetModel.findById(budgetId).session(session);
            if (!budget) {
                return res.status(404).json({ error: "Budget not found" });
            }

            if (budget.amount - budget.totalExpenses < amount) {
                return res.status(400).json({ error: "Expense exceeds the Budget" });
            }

            const expense = {
                description,
                amount,
                budgetId,
                user,
                category: budget.name
            };
            const newExpense = new ExpenseModel(expense);
            await newExpense.save({ session });
            await BudgetModel.findByIdAndUpdate(budgetId, { $inc: { totalExpenses: amount } }, { session });
            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({ success: 'Expense Added Successfully' });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ error: "An error occurred during the addition of the Expense" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = addExpense;
