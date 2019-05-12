/* Permissions Middleware */


'use strict';

/* User Model */
const User = require('../models/User');

/* Excluded URLS */
const excludedURLS = require('../../config/general').EXCLUDED_URLS;

/* General Config */
const PERMITS = require('../../config/general').PERMITS;

/* Utilities */
const utilities = require('../utilities/utilities');


function RolePermission(req, res, next) {
    const path = `/${req.path.split('/')[1]}`;
    if (utilities.searchInArray(path, excludedURLS)) return next();
    
    if (!req.user) return res.status(403).send({
        message: 'You does not have permissions'
    });

    const query = User.findById(req.user).select('userRole');

    query.exec((err, roles) => {
        if (err) return res.status(500).send({
            message: 'Inernal server error'
        });

        let allowed_urls = [];
        for (const r of roles.userRole) {
            const objs = utilities.findObjectByKey(PERMITS[r], 'method', req.method);
            for (const o of objs) {
                if (!utilities.searchInArray(o.url, allowed_urls)) {
                    allowed_urls.push(o.url);
                }
            }
        }      

        if (!utilities.searchInArray(path, allowed_urls)) return res.status(403).send({
            message: 'You does not have permission'
        });
        else return next();
    });
}

module.exports = RolePermission;
