function getUser(req, res) {
    res.status(200).send({
        userId: req.session.userId,
        userName: req.session.userName
    });
}
module.exports = getUser;