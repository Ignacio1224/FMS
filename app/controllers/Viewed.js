/* Viewed Controler */


'use Strict'

/* Viewed Model */
const Viewed = require('../models/Viewed');

/* Utilities*/
const utilities = require('../utilities/utilities');


function deleteViewed(req, res) {
    console.log('\nDELETE --> /ignodb/viewed/:viewedId');
    console.log(req.params.viewedId);

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
    console.log('\nGET --> /ignodb/viewed/:viewedId');
    console.log(req.params.viewedId);

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
    console.log('\nGET --> /ignodb/viewed');

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
    console.log('\nPOST --> /ignodb/viewed');
    console.log(req.body);

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
    console.log('\nPUT --> /ignodb/viewed/:viewedId');
    console.log(req.params.viewedId);

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
