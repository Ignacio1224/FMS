/* Viewed Routes */


'use Strict';

/* Router */
const api = require('express').Router();

/* ViewedController */
const ViewedController = require('../../controllers/Film/Viewed');


api.delete('/:viewedId', ViewedController.deleteViewed);
api.get('/', ViewedController.getVieweds);
api.get('/:viewedId', ViewedController.getViewed);
api.post('/', ViewedController.saveViewed);
api.put('/:viewedId', ViewedController.updateViewed);


module.exports = api;

