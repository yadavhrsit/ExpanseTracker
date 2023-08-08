const { validationResult, query } = require('express-validator');
const ExpenseModel = require('../../models/expense');

const sortCriteriaValues = ['date', 'category', 'amount'];

async function viewAllExpenses(req, res) {
    try {
        await query('sort').optional().isBoolean().toBoolean().run(req);
        await query('sortingCriteria').optional().isIn(sortCriteriaValues).run(req);
        await query('filter').optional().isBoolean().toBoolean().run(req);
        await query('filterCriteria.date-range').optional().isString().run(req);
        await query('filterCriteria.category').optional().isString().run(req);
        await query('filterCriteria.amount-range').optional().isString().run(req);
        await query('paginate').optional().isBoolean().toBoolean().run(req);
        await query('limit').optional().isInt().run(req);
        await query('page').optional().isInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let expenseQuery = ExpenseModel.find({ user: req.session.userId });

        // Sorting
        if (req.query.sort === 'true' && req.query.sortingCriteria) {
            const sortingCriteria = req.query.sortingCriteria;
            const sortOptions = {};

            if (sortingCriteria === 'date') {
                sortOptions.date = 1;
            } else if (sortingCriteria === 'category') {
                sortOptions.category = 1;
            } else if (sortingCriteria === 'amount') {
                sortOptions.amount = 1;
            }

            expenseQuery = expenseQuery.sort(sortOptions);
        }

        // Filtering
        if (req.query.filter === 'true' && req.query.filterCriteria) {
            const filterCriteria = req.query.filterCriteria;

            if (filterCriteria['date-range']) {
                const [startDate, endDate] = filterCriteria['date-range'].split('-');
                expenseQuery = expenseQuery.where('date').gte(new Date(startDate)).lte(new Date(endDate));
            }

            if (filterCriteria.category) {
                expenseQuery = expenseQuery.where('category').equals(filterCriteria.category);
            }

            if (filterCriteria['amount-range']) {
                const [minAmount, maxAmount] = filterCriteria['amount-range'].split('-');
                expenseQuery = expenseQuery.where('amount').gte(parseInt(minAmount, 10)).lte(parseInt(maxAmount, 10));
            }
        }

        // Pagination
        if (req.query.paginate === 'true') {
            const limit = parseInt(req.query.limit, 10) || 10;
            const pageNum = parseInt(req.query.page, 10) || 1;

            const totalEntries = await ExpenseModel.countDocuments({ user: req.session.userId });

            const totalPages = Math.ceil(totalEntries / limit);
            const skip = (pageNum - 1) * limit;

            expenseQuery = expenseQuery.skip(skip).limit(limit);

            const expenses = await expenseQuery;

            return res.status(200).json({
                expenses: expenses,
                totalPages: totalPages,
                currentPage: pageNum
            });
        }

        const expenses = await expenseQuery;
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during getting all the Expenses" });
    }
}

module.exports = viewAllExpenses;
