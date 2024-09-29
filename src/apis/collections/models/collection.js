const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;