const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const token = jwt.sign({ id: user.id },
                    process.env.SECRET,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 9000,
                    });
                req.session.token = token;
                return res.json({ success: "Login Successful" });
            } else {
                return res.json({ error: "Incorrect Password" });
            }
        } else {
            return res.json({ error: "Email is not Registered" });
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during login" });
    }
}

module.exports = loginUser;
