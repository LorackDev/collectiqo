const createCollectionEntryService = require('../services/createCollectionEntryService');

const createCollectionEntryController = async (req, res) => {
    const { collectionName, username, entries } = req.body;

    if (!collectionName || !username || !Array.isArray(entries)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const result = await createCollectionEntryService(collectionName, entries, username);

        res.status(200).json({ message: 'Entries saved successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = createCollectionEntryController;