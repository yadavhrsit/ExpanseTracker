const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: String,
    googleId: { type: String, unique: true },
})

const UserModel = mongoose.model('User', User);

module.exports = UserModel;