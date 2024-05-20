console.log(process.env)

const { describe, it, expect } = require('@jest/globals');
const extractData = require('../server/dbExtractor');

describe('extractData', () => {
    it('should return data when the table exists', async () => {
        const data = await extractData('clq_users');
        expect(data).toBeDefined();
    });

    it('should throw an error when the table does not exist', async () => {
        await expect(extractData('nonExistingTable')).rejects.toThrow();
    });
});