function getUser(req, res) {
    res.status(200).json({
        userId: req.session.userId,
        userName: req.session.userName
    });
}
module.exports = getUser;