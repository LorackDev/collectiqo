// src/apis/home/controllers/homeController.js
const homeController = (req, res) => {
    const username = req.session.username;

    if (username) {
        res.status(200).json({ message: `Welcome back, ${username}!` });
    } else {
        res.status(401).json({ message: 'Please log in first' });
    }
};

module.exports = homeController;
