const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    password: String
})

const UserModel = mongoose.model('User', User);

module.exports = UserModel;