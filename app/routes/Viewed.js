/* Viewed Routes */


'use Strict';

/* Router */
const api = require('express').Router();

/* ViewedController */
const ViewedController = require('../controllers/Viewed');

/* Auth Middleware */
const auth = require('../middlewares/Auth');

api.delete('/:viewedId', ViewedController.deleteViewed);
api.get('/', ViewedController.getVieweds);
api.get('/:viewedId', ViewedController.getViewed);
api.post('/', ViewedController.saveViewed);
api.put('/:viewedId', ViewedController.updateViewed);


module.exports = api;

