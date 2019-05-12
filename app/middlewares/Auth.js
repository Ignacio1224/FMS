/* Auth Middleware */


'use strict';

/* Excluded URLS */
const excludedURLS = require('../../config/general').EXCLUDED_URLS;

/* Service */
const service = require('../services/Index');

/* Utilities */
const utilities = require('../utilities/utilities');


function isAuth(req, res, next) {
    const path = `/${req.path.split('/')[1]}`;

    if (utilities.searchInArray(path, excludedURLS)) return next();

    if (!req.headers.authorization) return res.status(403).send({
        message: 'You do not have authorization!'
    });

    const token = req.headers.authorization.split(' ')[1];

    service.decodeToken(token)
    .then((response) => {
        req.user = response;
        next();
    }).catch((response) => {
        res.status(response.status);
    });
}

module.exports = isAuth;

