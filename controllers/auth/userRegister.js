const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');

async function RegisterUser(req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const hash = await bcrypt.hash(password, 10);
        const userInfo = {
            name: name,
            email: email,
            password: hash
        };

        const user = new UserModel(userInfo);
        await user.save();
        res.json("User Registration Successful");
    } catch (err) {
        res.status(500).json({ error: "An error occurred during user registration" });
    }
}

module.exports = RegisterUser;
