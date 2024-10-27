const requireAuth = (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/login-page');
    }
}

module.exports = requireAuth;