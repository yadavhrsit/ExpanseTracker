const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');

async function LoginUser(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email });
        if (user) {
            const result = bcrypt.compare(password, user.password);
            if (result) {
                res.json("Login Successful");
            } else {
                res.json("Incorrect Password");
            }
        } else {
            res.json("Email is not Registered");
        }
    } catch (err) {
        res.status(500).json({ error: "An error occurred during login" });
    }
}

module.exports = LoginUser;
