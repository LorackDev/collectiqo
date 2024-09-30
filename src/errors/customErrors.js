const { createError } = require('common-errors');

const CollectionNotFoundError = createError('CollectionNotFoundError', { statusCode: 400 });
const DatabaseError = createError('DatabaseError', { statusCode: 500 });

module.exports = {
    CollectionNotFoundError,
    DatabaseError
};