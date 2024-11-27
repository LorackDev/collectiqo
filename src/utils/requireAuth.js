const requireAuth = (req, res, next) => {
    if (req.session.user.name) {
        next();
    } else {
        res.redirect('/login-page');
    }
}

module.exports = requireAuth;