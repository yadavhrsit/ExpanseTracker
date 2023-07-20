const passport = require('passport');

function loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred during login", err });
        }
        if (!user) {
            return res.json({ error: info.message });
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            req.session.userId = user._id;
            return res.status(200).json({ success: "Login Successful" });
        });
    })(req, res, next);
}

module.exports = loginUser;
