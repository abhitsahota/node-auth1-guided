module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401)
    }
}
// checks if there is a valid session, if session has expired express-session will handle that and assign a new session