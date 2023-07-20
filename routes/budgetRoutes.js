const express = require('express');
const Router = express.Router();

const addBudget = require('../controllers/budget/addBudget');
const updateBudget = require('../controllers/budget/updateBudget');
const deleteBudget = require('../controllers/budget/deleteBudget');
const viewAllBudgets = require('../controllers/budget/viewAllBudgets');
const viewBudget = require('../controllers/budget/viewBudget');

const isAuthorized = require('../middlewares/isAuthenticated');

Router.post('/add', isAuthorized, addBudget);
Router.post('/update', isAuthorized, updateBudget);
Router.post('/delete', isAuthorized, deleteBudget);
Router.post('/viewall', isAuthorized, viewAllBudgets);
Router.post('/view', isAuthorized, viewBudget);

module.exports = Router;