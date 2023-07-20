const express = require('express');
const Router = express.Router();

const RegisterUser = require('../controllers/auth/userRegister');
const LoginUser = require('../controllers/auth/userLogin');
const LogoutUser = require('../controllers/auth/userLogOut');

Router.post('/register', RegisterUser);
Router.post('/login', LoginUser);
Router.post('/logout', LogoutUser);

module.exports = Router;