/* Index Service */

'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secretToken = require('../../config/general').SECRET_TOKEN;
const utilities = require('../utilities/utilities');


/**
 * createToken
 * @param {User} user
 * @returns {JWT}
 * @description Creates a token based on the encoded user._id 
 */
function createToken(user) {
    const encodedUserId = utilities.encode(user._id);
    
    const payload = {
        sub: encodedUserId,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, secretToken);
}

/**
 * decodeToken
 * @param {JWT} token
 * @returns {String}
 * @description Decodes the token
 */
function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, secretToken);
            
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Expired token'
                });
            }

            const decodedUserId = utilities.decode(payload.sub);
            resolve(decodedUserId);

        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });
    
    return decoded;
}



module.exports = {
    createToken,
    decodeToken
};

