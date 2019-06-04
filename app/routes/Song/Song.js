/* Song Routes */


'use Strict';


/* Router */
const api = require('express').Router();

/* SongController */
const SongController = require('../../controllers/Song/Song');


api.delete('/:songId', SongController.deleteSong);
api.get('/', SongController.getSongs);
api.get('/:songId', SongController.getSong);
api.post('/', SongController.saveSong);
api.put('/:songId', SongController.updateSong);


module.exports = api;
