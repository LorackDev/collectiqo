const axios = require('axios');
const { importPKCS8, SignJWT, decodeProtectedHeader, jwtVerify, importJWK } = require('jose');
const qs = require('qs');

/**
 * @typedef {Object} AppleSignInCredentials
 * @property {string} privateKey
 * @property {string} teamId
 * @property {string} keyId
 * @property {string} clientId
 */

/**
 * @typedef {Object} AppleSignInTokenResponse
 * @property {string} idToken
 * @property {string} refreshToken
 * @property {string} accessToken
 * @property {string} tokenType
 * @property {number} expiresIn
 */

/**
 * @typedef {Object} AppleUserRetrievedData
 * @property {string} aud
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {boolean} isPrivateEmail
 * @property {string} sub
 */

/**
 * AppleAuthHandler
 * @class
 */
class AppleAuthHandler {
    /**
     * @param {AppleSignInCredentials} credentials
     */
    constructor(credentials) {
        /** @private @readonly */
        this._credentials = credentials;
        /** @type {string|undefined} */
        this.clientSecret = undefined;
    }

    /** @type {object[]} */
    static publicKeys = [];

    /**
     * Generates and updates the client secret
     * @returns {Promise<string>}
     */
    async updateClientSecret() {
        try {
            const currentTime = Math.floor(Date.now() / 1000);
            const privateKey = await importPKCS8(this._credentials.privateKey, 'ES256');

            // Create and sign the JWT
            const jwt = await new SignJWT({
                iss: this._credentials.teamId,
                iat: currentTime,
                exp: currentTime + 60 * 60 * 24, // 1 day expiration
                aud: "https://appleid.apple.com",
                sub: this._credentials.clientId
            })
                .setProtectedHeader({ alg: 'ES256', kid: this._credentials.keyId })
                .sign(privateKey);

            this.clientSecret = jwt;
            return jwt;
        } catch (error) {
            console.log('Error creating client secret:', error);
            throw error;
        }
    }

    /**
     * Fetches and updates Apple's public keys
     * @returns {Promise<object[]>}
     */
    static async updatePublicKey() {
        try {
            const url = 'https://appleid.apple.com/auth/oauth2/v2/keys';
            const { status, data } = await axios.get(url);

            if ([200, 201, 204].includes(status)) {
                const keys = data.keys;
                if (keys && keys.length > 0) {
                    AppleAuthHandler.publicKeys = keys;
                    return keys;
                } else {
                    console.log('No keys found in the response.');
                    throw new Error('No keys found in the response');
                }
            }

            throw {
                message: 'Failed to execute HTTP request',
                status,
                data,
            };

        } catch (error) {
            console.error('Error fetching keys:', error);
            throw error;
        }
    }

    /**
     * Retrieves token using authorization code
     * @param {string} authorizationCode
     * @returns {Promise<AppleSignInTokenResponse>}
     */
    async retrieveToken(authorizationCode) {
        if (!this.clientSecret) {
            throw new Error('Client secret not set. Please call initialize() first.');
        }

        try {
            const requestData = qs.stringify({
                'client_id': this._credentials.clientId,
                'client_secret': this.clientSecret,
                'code': authorizationCode,
                'grant_type': 'authorization_code'
            });

            const { data, status } = await axios({
                method: 'post',
                url: 'https://appleid.apple.com/auth/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Axios/1.2.0',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br'
                },
                data: requestData
            });

            if ([200, 201, 204].includes(status)) {
                return {
                    idToken: data.id_token,
                    refreshToken: data.refresh_token,
                    accessToken: data.access_token,
                    tokenType: data.token_type,
                    expiresIn: data.expires_in
                };
            }

            throw {
                message: 'Failed to execute HTTP request',
                status,
                data,
            };
        } catch (error) {
            console.error('Error retrieving token:', error.response.data);
            throw error.response.data;
        }
    }

    /**
     * Gets the public key using key ID (kid)
     * @param {string} kid
     * @returns {Promise<object>}
     */
    static async getPublicKey(kid) {
        if (AppleAuthHandler.publicKeys.length === 0) {
            await AppleAuthHandler.updatePublicKey();
        }

        const foundKey = AppleAuthHandler.publicKeys.find(key => key.kid === kid);
        if (foundKey) {
            return foundKey;
        }

        await AppleAuthHandler.updatePublicKey();
        const foundKeySecondAttempt = AppleAuthHandler.publicKeys.find(key => key.kid === kid);

        if (foundKeySecondAttempt) {
            return foundKeySecondAttempt;
        }

        throw new Error('AppleAuthHandler: Public key not found');
    }

    /**
     * Decodes and validates the idToken
     * @param {string} idToken
     * @returns {Promise<object>}
     */
    static async decodeIdToken(idToken) {
        if (AppleAuthHandler.publicKeys.length === 0) {
            throw new Error('Apple PublicKey not set. Please call initialize() first.');
        }

        const idTokenHeader = await decodeProtectedHeader(idToken);
        const relatedPublicKey = await AppleAuthHandler.getPublicKey(idTokenHeader.kid);
        const publicKey = await importJWK(relatedPublicKey);
        const { payload } = await jwtVerify(idToken, publicKey);

        return payload;
    }

    /**
     * Validates user credentials and returns user information
     * @param {Object} params
     * @param {string} params.authorizationCode
     * @param {string} [params.nonce]
     * @returns {Promise<AppleUserRetrievedData>}
     */
    async validateUserCredentials({ authorizationCode, nonce }) {
        try {
            const tokenResponse = await this.retrieveToken(authorizationCode);
            const decodedToken = await AppleAuthHandler.decodeIdToken(tokenResponse.idToken);
            const { iss, sub, aud, email, email_verified, is_private_email, nonce: tokenNonce } = decodedToken;

            // Validate token properties
            this.validateTokenProperties(iss, aud, sub, email_verified, nonce, tokenNonce);

            return {
                aud,
                email,
                emailVerified: email_verified === 'true',
                isPrivateEmail: is_private_email === 'true',
                sub,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validates token properties
     * @param {string} iss
     * @param {string} aud
     * @param {string} sub
     * @param {boolean} emailVerified
     * @param {string} [clientNonce]
     * @param {string} [nonce]
     * @throws Will throw an error if token properties are invalid
     */
    validateTokenProperties(iss, aud, sub, emailVerified, clientNonce, nonce) {
        if (!iss.includes('https://appleid.apple.com')) {
            throw new Error('Token issuer is invalid.');
        }
        if (aud !== this._credentials.clientId) {
            throw new Error('Token audience is invalid.');
        }
        if (!sub) {
            throw new Error('Token subject is invalid.');
        }
        if (!emailVerified) {
            throw new Error('Email not verified.');
        }
        if (nonce && nonce !== clientNonce) {
            throw new Error('Nonce is invalid.');
        }
    }
}

module.exports = { AppleAuthHandler };