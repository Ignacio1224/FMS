/* Index Service */

'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secretToken = require('../../config/general').SECRET_TOKEN;
const utilities = require('../utilities/utilities');
const Nodemailer = require('nodemailer');
const emailConfig = require('../../config/mail').transporter;


/**
 * createToken
 * @param {String} str
 * @returns {JWT}
 * @description Creates a token based on str 
 */
function createToken(str) {
    const encodedStr = utilities.encode(str);
    
    const payload = {
        sub: encodedStr,
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

            const decodedStr = utilities.decode(payload.sub);
            resolve(decodedStr);

        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });
    
    return decoded;
}


function sendMail(to, subject, message, is_html = false) {
    let transporter = Nodemailer.createTransport(emailConfig);

    let html = null, text = null;

    if (is_html) {
        html = message;
    } else {
        text = message;
    }

    let info = transporter.sendMail({
        from: '"IgnoDB" <ignodb@myapp.com>',
        to: to, 
        subject,
        text,
        html,
    });

    return info;
}


module.exports = {
    createToken,
    decodeToken,
    sendMail
};

