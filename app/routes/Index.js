/* All Routes */


'use Strict';

/* Express Router */
const routes = require('express').Router();

/* Middleware */
const authToken = require('../middlewares/Auth');
routes.use(authToken);
const perms = require('../middlewares/Permissions');
routes.use(perms);


/* Auth Route */
const auth = require('./Auth');
routes.use('/', auth);

/* User Route */
const user = require('./User');
routes.use('/user', user);

/* Film Route */
const film = require('./Film');
routes.use('/film', film);

/* Viewed Route */
const viewed = require('./Viewed');
routes.use('/viewed', viewed);

module.exports = routes;

