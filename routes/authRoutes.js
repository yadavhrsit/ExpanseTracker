const express = require('express');
const Router = express.Router();

const { registerUser, registerUserValidation } = require('../controllers/auth/userRegister');
const { loginUser, loginUserValidation } = require('../controllers/auth/userLogin');
const LogoutUser = require('../controllers/auth/userLogOut');

Router.post('/register', registerUserValidation, registerUser);
Router.post('/login', loginUserValidation, loginUser);
Router.get('/logout', LogoutUser);

module.exports = Router;