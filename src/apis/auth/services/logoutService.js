const logoutService = async (req, res, next) => {
    try {
        await req.session.destroy();
    } catch (err) {
        console.error('Error logging out:', err);
        return next(new Error('Error jogging out'));
    }

    res.status(200).send();
};

module.exports = logoutService;
