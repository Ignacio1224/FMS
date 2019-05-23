/* Auth Controller */


'use strict';

const Service = require('../../services/Index');
const Utilities = require('../../utilities/utilities');
const User = require('../../models/User/User');
const PasswordReset = require('../../models/User/PasswordReset');
const mail = require('../../../config/mail');

function passwordReset(req, res) {

    User.findOne({
        $or: [{
                userName: req.body.userName
            },
            {
                userEmail: req.body.userName
            }
        ]
    }, (err, user) => {

        if (err) return res.status(500).send({
            message: err
        });

        if (!user) return res.status(404).send({
            message: 'User does not exist'
        });

        const code = Utilities.makeCode(6);

        let pwdReset = new PasswordReset();
        pwdReset._userId = user._id;
        pwdReset.code = code;

        const codeToSendInToken = code + '#$' + user._id;

        const tokenToSend = Service.createToken(codeToSendInToken);

        PasswordReset.find({
            _userId: user._id
        }).deleteOne().exec();

        pwdReset.save((err, pwdReset) => {

            if (err) {
                return res.status(500).send({
                    message: `Error, make the trsnsaction: ${err}`
                });
            }

            const url = `http://localhost:1224${req.originalUrl}_done/${tokenToSend}`;

            Service.sendMail(user.userEmail, 'Password reset', mail.resetPasswordRequestTemlate(user.userName, url), true)
                .then(() => {
                    res.status(200).send({
                        message: 'The reset code was sended to the registered email!',
                    });
                })
                .catch((err) => {
                    console.log(err);
                });;

        });

    });

}

function passwordResetDone(req, res) {

    Service.decodeToken(req.params.token)
        .then((response) => {

            const code = response.split('#$')[0];
            const _userId = response.split('#$')[1];

            PasswordReset.findOne({
                _userId
            }, (err, prd) => {

                if (err) {
                    return res.status(500).send({
                        message: `Error, could'nt make the trsnsaction: ${err}`
                    });
                }

                if (!prd) return res.status(404).send({
                    message: `Error: ${err}`
                });

                if (req.body.passwordReset != req.body.passwordResetConfirm) {
                    return res.status(402).send({
                        message: `Error, the passwords are not the same: ${err}`
                    });
                }

                prd.compareCode(code, (err, isMatch) => {

                    if (err) {
                        return res.status(500).send({
                            message: `Error, can not compare those codes: ${err}`
                        });
                    }

                    if (!isMatch) return res.status(400).send({
                        message: 'Incorrect code! Please request another code'
                    });

                    PasswordReset.find({
                        _userId
                    }).deleteOne().exec();

                    const userPassword = req.body.passwordReset

                    User.findById(_userId, (err, userToSave) => {

                        if (err) {
                            return res.status(500).send({
                                message: `Error, make the trsnsaction: ${err}`
                            });
                        }

                        if (!userToSave) {
                            return res.status(404).send({
                                message: `Usuario no encontrado: ${err}`
                            });
                        }

                        userToSave.userPassword = userPassword;

                        userToSave.save((err, user) => {
                            if (err) {
                                return res.status(500).send({
                                    message: `Error, couldn't save the user: ${err}`
                                });
                            }

                            res.status(200).send({
                                message: 'Password changed!'
                            });

                        });

                    });

                });

            });

        }).catch((response) => {

            PasswordReset.find({
                _userId: user._id
            }).deleteOne().exec();

            return res.status(500).send({
                message: `Error, make the trsnsaction: ${response}`
            });

        });

}

function signUp(req, res) {

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
            token: Service.createToken(user._userId)
        });

    });

}

function signIn(req, res) {

    User.findOne({
        $or: [{
                userName: req.body.userName
            },
            {
                userEmail: req.body.userName
            }
        ]
    }, (err, user) => {
        
        if (err) return res.status(500).send({
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


            user.lastLogin = new Date();
            
            user.save((err, user) => {
                if (err) return res.status(500).send({
                    message: 'Could not login ' + err
                });

                user.userPassword = undefined;
                req.user = user;

                res.status(200).send({
                    message: 'Logged successfully',
                    token: Service.createToken(user._userId)
                });

            });
            
        });

    });

}


module.exports = {
    passwordReset,
    passwordResetDone,
    signUp,
    signIn
};
