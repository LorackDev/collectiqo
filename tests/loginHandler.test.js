/* global jest, describe, it, expect, beforeEach */
const request = require('supertest');
const express = require('express');
const loginHandler = require('../src/server/authentication/loginHandler');
const bcrypt = require('bcrypt');
const db = require('../src/server/dbConnections/connectToMYSQL');

jest.mock('bcrypt');
jest.mock('../src/server/dbConnections/connectToMYSQL');

const app = express();
app.use(express.json());
app.post('/login', loginHandler);

describe('loginHandler', () => {
    beforeEach(() => {
        db.query.mockReset();
        bcrypt.compare.mockReset();
    });

    it('returns 200 and success message when login is successful', async () => {
        const mockUser = { username: 'Alice', password: 'RabbitHole1' };
        db.query.mockImplementation(() => Promise.resolve([mockUser]));
        bcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
            .post('/login')
            .send({ username: 'Alice', password: 'RabbitHole1' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Login successful" });
    });

    it('returns 401 and error message when password is incorrect', async () => {
        const mockUser = { username: 'test', password: '$2b$10$test' };
        db.query.mockImplementation(() => Promise.resolve([mockUser]));
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/login')
            .send({ username: 'test', password: 'wrong' });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Incorrect password" });
    });

    it('returns 401 and error message when user is not found', async () => {
        db.query.mockImplementation(() => Promise.resolve([]));

        const response = await request(app)
            .post('/login')
            .send({ username: 'nonexistent', password: 'test' });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "User not found" });
    });

    it('throws error when SQL query fails', async () => {
        db.query.mockImplementation(() => Promise.reject(new Error('SQL query failed')));

        const response = await request(app)
            .post('/login')
            .send({ username: 'test', password: 'test' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ message: "An error occurred" });
    });
});