const express = require('express');
const Router = express.Router();

const addBudget = require('../controllers/budget/addBudget');
const updateBudget = require('../controllers/budget/updateBudget');
const deleteBudget = require('../controllers/budget/deleteBudget');
const viewAllBudgets = require('../controllers/budget/viewAllBudgets');
const viewBudget = require('../controllers/budget/viewBudget');

Router.post('/add', addBudget);
Router.post('/update', updateBudget);
Router.post('/delete', deleteBudget);
Router.post('/viewall', viewAllBudgets);
Router.post('/view', viewBudget);

module.exports = Router;