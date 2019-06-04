/* Song Controler */


'use Strict'


/* Song Model */
const Song = require('../../models/Song/Song');
const SongLog = require('../../models/Song/SongLog');

/* Utilities*/
const utilities = require('../../utilities/utilities');


function deleteSong(req, res) {

    Song.findById(req.params.SongId, (err, song) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        // Delete the song
        Song.deleteOne(err => {
            if (err) return res.status(500).send({
                message: `Internal server error ${err}`
            });

            let sl = new SongLog();
            sl.songName = song.songName;
            sl._userId = req.user._id;
            sl.action = "del";

            // Save the log
            sl.save((err, songSaved) => {

                if (err) {
                    return res.status(500).send({
                        message: `Error, couldn't delete the song: ${err}`
                    });
                }
        
                res.status(200).send({
                    message: `The Song has been deleted`
                });
        
            });

        });

    });

}

function getSong(req, res) {

}

function getSongs(req, res) {

}

function saveSong(req, res) {

}

function updateSong(req, res) {

    Film.findByIdAndUpdate(req.params.filmId, req.body, (err, product) => {

        if (err) {
            return res.status(500).send({
                message: `Error, couldn't save the film: ${err}`
            });
        }

        res.status(200).send({
            film
        });

    });

}


module.exports = {
    deleteSong,
    getSong,
    getSongs,
    saveSong,
    updateSong
}
