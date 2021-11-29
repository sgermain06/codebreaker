const jwt = require('jsonwebtoken');
const Boom = require('boom');

const crypto = require('crypto');

const Players = require('../models/players');

const { adminUser } = require('../../index');
const {
    pick
} = require('lodash');

const hex_md5 = string => crypto.createHash('md5').update(string).digest('hex');

module.exports = {
    apiLogin: async req => {
        const { username, password } = req.orig.payload;
        const jwtSecret = process.env.JWT_SECRET;

        let token;
        
        if (username === adminUser.username && hex_md5(password) === adminUser.password) {
            console.log('admin user login');
            token = jwt.sign(pick(adminUser, ['id', 'name', 'username']), jwtSecret);
        }
        else {
            const exp = Math.floor(new Date() / 1000) + (60 * 60);
            const playerRecord = await Players.getByUsername(username);
            if (playerRecord && hex_md5(password) === playerRecord.password) {
                token = jwt.sign({ ...pick(playerRecord, ['id', 'name', 'username']), exp }, jwtSecret);
            }
        }

        if (token) {
            return { token };
        }
        else { 
            throw Boom.forbidden('Invalid username or password');
        }
    },
    apiRefreshToken: async req => {
        const headerToken = req.headers.authorization.replace(/^Bearer\s/, '');
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jwt.decode(headerToken);
        const exp = Math.floor(new Date() / 1000) + (60 * 60);

        const token = jwt.sign({ ...pick(decoded, ['id', 'name', 'username']), exp }, jwtSecret);

        return { token };
    }
};