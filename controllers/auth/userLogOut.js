function userLogout(req, res) {
    try {
        req.session.destroy();
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        return res.status(500).send({ error: "Internal Server Error!" });
    }
}
module.exports = userLogout;