/* Auth Routes */


'use Strict';


/* Router */
const api = require('express').Router();

/* AuthController */
const AuthController = require('../../controllers/User/Auth');


api.post('/signin', AuthController.signIn);
api.post('/signup', AuthController.signUp);
api.post('/password_reset', AuthController.passwordReset)
api.post('/password_reset_done/:token', AuthController.passwordResetDone)


module.exports = api;

