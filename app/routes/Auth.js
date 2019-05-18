/* Auth Routes */


'use Strict';

/* Router */
const api = require('express').Router();

/* AuthController */
const AuthController = require('../controllers/Auth');


api.post('/signin', AuthController.signIn);
api.post('/signup', AuthController.signUp);
api.post('/password_reset', AuthController.passwordReset)
api.post('/password_reset_done/:token', AuthController.passwordResetDone)
// api.post(/password_reset_done\/[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, AuthController.passwordResetDone)


module.exports = api;

