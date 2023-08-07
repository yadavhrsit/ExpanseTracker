const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const BudgetModel = require('../../models/budget');
const ExpenseModel = require('../../models/expense');

async function addExpense(req, res) {
    try {
        await check('description').notEmpty().withMessage('Description is required').run(req);
        await check('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number').run(req);
        await check('budgetId').notEmpty().withMessage('Budget ID is required').isMongoId().withMessage('Invalid Budget ID').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { description, amount, budgetId } = req.body;
        const user = req.session.userId;
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const budget = await BudgetModel.findById(budgetId).session(session);
            if (!budget) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ error: "Budget not found" });
            }

            const allExpensesInBudget = await ExpenseModel.find({ budgetId }).session(session);
            const cumulativeTotal = allExpensesInBudget.reduce((total, expense) => total + expense.amount, 0);

            if (budget.amount - cumulativeTotal < amount) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ error: "Expense exceeds the Budget" });
            }

            const expenseData = {
                description,
                amount,
                budgetId,
                user,
                category: budget.name
            };
            const newExpense = new ExpenseModel(expenseData);
            await newExpense.save({ session });

            await session.commitTransaction();
            session.endSession();
            return res.status(201).json({ success: 'Expense Added Successfully' });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ error: "An error occurred during the addition of the Expense" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error", error });
    }
}

module.exports = addExpense;
