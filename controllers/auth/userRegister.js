const { validationResult, body } = require('express-validator');
const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const registerUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        name = name.split(' ')
            .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
            .join(' ');
        email = email.toLowerCase();
        const hash = await bcrypt.hash(password, 10);
        const googleId = uuidv4();

        const user = new UserModel({
            name,
            email,
            password: hash,
            googleId,
        });

        await user.save();
        return res.status(201).json({ message: "User Registration Successful" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred during user registration", error });
    }
}

module.exports = { registerUser, registerUserValidation };
