/* Film Controler */


'use Strict'


/* Film Model */
const Film = require('../../models/Film/Film');

/* Utilities*/
const utilities = require('../../utilities/utilities');


function deleteFilm(req, res) {

    Film.findById(req.params.FilmId, (err, product) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        Film.deleteOne(err => {
            if (err) return res.status(500).send({
                message: `Internal server error ${err}`
            });

            res.status(200).send({
                message: `The Film has been deleted`
            });

        });

    });

}

function getFilm(req, res) {

    Film.findById(req.params.filmId, (err, film) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        if (!film) return res.status(404).send({
            message: "This film does not exists"
        });

        res.status(200).send({
            film
        });

    });

}

function getFilms(req, res) {

    Film.find({}, (err, films) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        if (utilities.isNullOrEmpty(films)) return res.status(404).send({
            message: `Films not found`
        });

        res.status(200).send({
            films
        });

    });

}

function saveFilm(req, res) {

    let film = new Film();
    film.filmName = req.body.filmName;
    film.filmDuration = req.body.filmDuration;
    film.memoryAddress = req.body.memoryAddress;

    film.save((err, film) => {

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

function updateFilm(req, res) {

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
    deleteFilm,
    getFilm,
    getFilms,
    saveFilm,
    updateFilm
}
