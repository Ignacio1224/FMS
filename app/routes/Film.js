/* Film Routes */


'use Strict';

/* Router */
const api = require('express').Router();

/* FilmController */
const FilmController = require('../controllers/Film');

/* Auth Middleware */
// const auth = require('../middlewares/Auth');

/* Auth Middleware */
// const permissions = require('../middlewares/Permissions');


api.delete('/:filmId', FilmController.deleteFilm);
api.get('/', FilmController.getFilms);
api.get('/:filmId', FilmController.getFilm);
api.post('/', FilmController.saveFilm);
api.put('/:filmId', FilmController.updateFilm);


module.exports = api;

