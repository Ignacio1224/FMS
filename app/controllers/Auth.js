/* Auth Controller */

'use strict';

const service = require('../services/Index');
const User = require('../models/User');


function signUp(req, res) {
    console.log('\nPOST --> /ignodb/signUp');
    console.log(req.body);

    let user = new User();
    user.userName = req.body.userName;
    user.userPassword = req.body.userPassword;
    user.userEmail = req.body.userEmail;
    user.userRole = 'Common';

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({
                message: `Error, couldn't save the user: ${err}`
            });
        }

        res.status(200).send({
            token: service.createToken(user)
        });
    });
}

function signIn(req, res) {
    console.log('\nPOST --> /ignodb/signIn');
    console.log(req.body);

    User.findOne({
        $or: [
            {userName: req.body.userName},
            {userEmail: req.body.userName}
        ]
    }, (err, user) => {
        
        if (err) return res.status(500).se/nd({
            message: err
        });

        if (!user) return res.status(404).send({
            message: 'User does not exist'
        });


        user.comparePassword(req.body.userPassword, function (err, isMatch) {
            if (err) throw err;
            
            if (!isMatch) return res.status(400).send({
                message: 'Incorrect password!'
            });
            
            user.userPassword = undefined;
            req.user = user;
            
            res.status(200).send({
                message: 'Logged successfully',
                token: service.createToken(user)
            });
        });
    });
}

module.exports = {
    signUp,
    signIn
};
