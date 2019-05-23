/* User Routes */


'use Strict';


/* Router */
const api = require('express').Router();

/* UserController */
const UserController = require('../../controllers/User/User');


api.delete('/:userId', UserController.deleteUser);
api.get('/', UserController.getUsers);
api.get('/:userId', UserController.getUser);
api.post('/', UserController.saveUser);
api.put('/:userId', UserController.updateUser);


module.exports = api;
