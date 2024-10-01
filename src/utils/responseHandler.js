const sendSuccessResponse = (res, data, message = 'Success') => {
    res.status(200).json({ message, data });
};

module.exports = {
    sendSuccessResponse
};