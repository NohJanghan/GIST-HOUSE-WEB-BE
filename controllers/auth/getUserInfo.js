function getUserInfo(req, res) {
    if(!req.session.userInfo){
        return res.status(403).send('403 forbidden')
    } else {
        return res.send(req.session.userInfo)
    }
}

module.exports = getUserInfo