/* User Controler */


'use Strict'

/* User Model */
const User = require('../models/User');

/* Utilities*/
const utilities = require('../utilities/utilities');

function deleteUser(req, res) {
    console.log('\nDELETE --> /ignodb/user/:userId');
    console.log(req.params.userId);

    User.findById(req.params.userId, (err, product) => {
        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        User.deleteOne(err => {
            if (err) return res.status(500).send({
                message: `Internal server error ${err}`
            });

            res.status(200).send({
                message: `The user has been deleted`
            });
        });
    });
}


function getUser(req, res) {
    console.log('\nGET --> /ignodb/user/:userId');
    console.log(req.params.userId);

    User.findById(req.params.userId, (err, user) => {
        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        if (!user) return res.status(404).send({
            message: "This user does not exists"
        });

        res.status(200).send({
            user
        });
    });
}


function getUsers(req, res) {
    console.log('\nGET --> /ignodb/user');

    User.find({}, (err, users) => {
        if (err) return res.status(500).send({
            message: `Internal server error ${err}`
        });

        if (utilities.isNullOrEmpty(users)) return res.status(404).send({
            message: `Users not found`
        });

        res.status(200).send({
            users
        });
    });
}


function saveUser(req, res) {
    console.log('\nPOST --> /ignodb/user');
    console.log(req.body);

    let user = new User();
    user.userName = req.body.userName;
    user.userPassword = req.body.userPassword;
    user.userEmail = req.body.userEmail;
    user.userRole = req.body.userRole;

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({
                message: `Error, couldn't save the user: ${err}`
            });
        }
        res.status(200).send({
            user
        });
    });
}


function updateUser(req, res) {
    console.log('\nPUT --> /ignodb/user/:userId');
    console.log(req.params.userId);

    User.findByIdAndUpdate(req.params.userId, req.body, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: `Error, couldn't save the user: ${err}`
            });
        }

        res.status(200).send({
            user
        });
    });

}


module.exports = {
    deleteUser,
    getUser,
    getUsers,
    saveUser,
    updateUser
}
