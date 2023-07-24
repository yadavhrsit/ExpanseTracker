const UserModel = require('../../models/user');

async function checkEmailAvailability(req, res) {
    const email = req.params.email;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered with this email" });
        } else {
            return res.status(200).json({ available: true });
        }
    } catch (error) {
        console.error('Error checking email availability:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = checkEmailAvailability;
