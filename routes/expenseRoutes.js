const express = require('express');
const Router = express.Router();

const addExpense = require('../controllers/expense/addExpense');
const updateExpense = require('../controllers/expense/updateExpense');
const deleteExpense = require('../controllers/expense/deleteExpense');
const viewAllExpenses = require('../controllers/expense/viewAllExpenses');
const viewExpense = require('../controllers/expense/viewExpense');

Router.post('/add', addExpense);
Router.post('/update', updateExpense);
Router.post('/delete', deleteExpense);
Router.post('/viewall', viewAllExpenses);
Router.post('/view', viewExpense);

module.exports = Router;