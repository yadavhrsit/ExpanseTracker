const express = require('express');
const Router = express.Router();

const RegisterUser = require('../controllers/auth/userRegister');
const LoginUser = require('../controllers/auth/userLogin');

Router.post('/register', RegisterUser);
Router.post('/login', LoginUser);

module.exports = Router;