function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ error: "Authentication required." });
    }
}

module.exports = ensureAuthenticated;
