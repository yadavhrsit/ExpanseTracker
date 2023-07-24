function getUser(req, res) {
    res.send({
        userId: req.session.userId,
        userName: req.session.userName
    });
}
module.exports = getUser;