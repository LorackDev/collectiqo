require('dotenv').config({ path: '../.env' });
const request = require('supertest');
const express = require('express');
const signupHandler = require('../public/js/signUpHandler');
const { describe, it, expect } = require('@jest/globals');

const app = express();
app.use(express.json());
app.post('/signup', signupHandler);

describe('signupHandler', () => {
    it('should create a new user when provided valid data', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: 'testUser',
                email: 'testUser@example.com',
                password: 'testPassword'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    }, 10000);

    it('should return a conflict error when a user with the same username already exists', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: 'existingUser',
                email: 'newUser@example.com',
                password: 'testPassword'
            });

        expect(res.statusCode).toEqual(409);
        expect(res.body).toHaveProperty('message', 'User already exists');
    }, 10000);

    it('should return an error when no data is provided', async () => {
        const res = await request(app)
            .post('/signup')
            .send({});

        expect(res.statusCode).toEqual(400);
    }, 10000);
});