/* Auth Routes */


'use Strict';

/* Router */
const api = require('express').Router();

/* AuthController */
const AuthController = require('../controllers/Auth');


api.post('/signIn', AuthController.signIn);
api.post('/signUp', AuthController.signUp);


module.exports = api;
