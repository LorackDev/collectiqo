exports.logout = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            // Assuming session-based authentication
            req.session.destroy(err => {
                if (err) {
                    return reject(new Error('Failed to logout'));
                }
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
};
