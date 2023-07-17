const ExpenseModel = require('../../models/expense');
const express = require('express');
const router = express.Router();

async function viewAllExpenses(req, res) {
    try {
        let query = ExpenseModel.find({});

        // Sorting
        if (req.body.sort === 'true' && req.body.sortingCriteria) {
            const sortingCriteria = req.body.sortingCriteria;
            const sortOptions = {};

            if (sortingCriteria === 'date') {
                sortOptions.date = 1;
            } else if (sortingCriteria === 'category') {
                sortOptions.category = 1;
            } else if (sortingCriteria === 'amount') {
                sortOptions.amount = 1;
            }

            query = query.sort(sortOptions);
        }

        // Filtering
        if (req.body.filter === 'true' && req.body.filterCriteria) {
            const filterCriteria = req.body.filterCriteria;

            if (filterCriteria['date-range']) {
                const [startDate, endDate] = filterCriteria['date-range'].split('-');
                query = query.where('date').gte(new Date(startDate)).lte(new Date(endDate));
            }

            if (filterCriteria.category) {
                query = query.where('category').equals(filterCriteria.category);
            }

            if (filterCriteria['amount-range']) {
                const [minAmount, maxAmount] = filterCriteria['amount-range'].split('-');
                query = query.where('amount').gte(minAmount).lte(maxAmount);
            }
        }

        // Pagination
        if (req.body.paginate && req.body.paginate.value === true) {
            const limit = parseInt(req.body.paginate.limit) || 10;
            const pageNum = parseInt(req.body.paginate.currentPage) || 1;
            const totalEntries = await ExpenseModel.countDocuments();

            const totalPages = Math.ceil(totalEntries / limit);
            const skip = (pageNum - 1) * limit;

            query = query.skip(skip).limit(limit);

            const expenses = await query;

            return res.status(200).json({
                expenses: expenses,
                totalPages: totalPages,
                currentPage: pageNum
            });
        }

        const expenses = await query;

        if (expenses.length === 0) {
            return res.status(404).json({ error: "No Expenses found" });
        }

        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during getting all the Expenses" });
    }
}

module.exports = viewAllExpenses;
