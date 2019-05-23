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
const auth = require('./User/Auth');
routes.use('/', auth);

/* User Route */
const user = require('./User/User');
routes.use('/user', user);

/* Film Route */
const film = require('./Film/Film');
routes.use('/film', film);

/* Viewed Route */
const viewed = require('./Film/Viewed');
routes.use('/viewed', viewed);

module.exports = routes;

