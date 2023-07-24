const express = require('express');
const Router = express.Router();
const checkEmailAvailability = require('../controllers/utils/checkEmailAvailable');
const getUser = require('../controllers/utils/getUser');
const isAuthorized = require('../middlewares/isAuthenticated');

Router.get('/isemailavail/:email', checkEmailAvailability);
Router.get('/getuser', isAuthorized, getUser);

module.exports = Router;