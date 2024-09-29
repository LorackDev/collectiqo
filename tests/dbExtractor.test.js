/* global jest */
const { describe, it, expect } = require('@jest/globals');
const extractData = require('../src/server/dbExtractor');
const connection = require('../src/server/dbConnections/connectToMYSQL');

jest.mock('../src/server/dbConnections/connectToMYSQL', () => {
    return {
        query: jest.fn()
    };
});

describe('extractData', () => {
    it('returns data when table exists', async () => {
        const mockData = [{ id: 1, name: 'John Doe' }];
        connection.query.mockImplementation((query, callback) => {
            callback(null, mockData);
        });

        const data = await extractData('clq_users');
        expect(data).toEqual(mockData);
    });

    it('throws error when table does not exist', async () => {
        const mockError = new Error('Table does not exist');
        connection.query.mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        await expect(extractData('nonExistingTable')).rejects.toEqual(mockError);
    });

    it('throws error when query fails', async () => {
        const mockError = new Error('Query failed');
        connection.query.mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        await expect(extractData('clq_users')).rejects.toEqual(mockError);
    });
});