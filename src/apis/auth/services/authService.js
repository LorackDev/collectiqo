const bcrypt = require('bcryptjs');
const User = require('../models/user');

class AuthService {
    async register(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return user;
    }

    async login(usernameOrEmail, password) {
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        return user;
    }
}

module.exports = new AuthService();