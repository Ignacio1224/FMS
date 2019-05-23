/* Viewed Controler */


'use Strict'

/* Viewed Model */
const Viewed = require('../../models/Film/Viewed');

/* Utilities*/
const utilities = require('../../utilities/utilities');


function deleteViewed(req, res) {

    Viewed.findById(req.params.viewedId, (err, product) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        Viewed.deleteOne(err => {
            if (err) return res.status(500).send({
                message: `Internal server error ${err}`
            });

            res.status(200).send({
                message: `The viewed has been deleted`
            });

        });

    });

}

function getViewed(req, res) {

    Viewed.findById(req.params.viewedId, (err, viewed) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        if (!viewed) return res.status(404).send({
            message: "This viewed does not exists"
        });

        res.status(200).send({
            viewed
        });

    });

}

function getVieweds(req, res) {

    Viewed.find({}, (err, vieweds) => {

        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        if (utilities.isNullOrEmpty(vieweds)) return res.status(404).send({
            message: `Vieweds not found`
        });

        res.status(200).send({
            vieweds
        });

    });

}

function saveViewed(req, res) {

    let viewed = new Viewed();
    viewed._userId = req.body.userId;
    viewed._filmId = req.body.filmId;
    viewed.rating = req.body.rating;
    viewed.viewedDate = req.body.viewedDate;

    viewed.save((err, viewed) => {

        if (err) {
            return res.status(500).send({
                message: `Error, couldn't save the viewed: ${err}`
            });
        }

        res.status(200).send({
            viewed
        });

    });

}

function updateViewed(req, res) {

    Viewed.findByIdAndUpdate(req.params.viewedId, req.body, (err, viewed) => {

        if (err) {
            return res.status(500).send({
                message: `Error, couldn't save the viewed: ${err}`
            });
        }

        res.status(200).send({
            viewed
        });
        
    });

}


module.exports = {
    deleteViewed,
    getViewed,
    getVieweds,
    saveViewed,
    updateViewed
}
