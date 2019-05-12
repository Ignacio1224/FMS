/* User Model */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const passwordSalt = require('../../config/general').PASSWORD_SALT;


const UserSchema = Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "The user name is required!"]
    },

    userPassword: {
        type: String,
        required: [true, "The password is required!"],
        validator: function (pwd) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,64}$/g.test(pwd)
        },
        message: props => `${props.value} is not a valid password!`//,
        //select: false
    },

    userEmail: {
        type: String,
        unique: true,
        required: [true, "The password is required"],
        validate: function (e) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e);

        },
        message: props => `${props.value} is not a valid email!`
    },

    lastLogin: {
        type: Date
    },

    signupDate: {
        type: Date,
        default: Date.now
    },

    userRole: {
        type: [{
            type: String,
            enum: ['SuperUser', 'Administrator', 'Common']
        }],
        required: [true, "Is necessary set a role to this user!"]
    },

    userImage: {
        type: String
    }
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('userPassword')) return next();

    bcrypt.genSalt(passwordSalt, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.userPassword, salt, function (err, hash) {
            if (err) return next(err);
            user.userPassword = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {    
    bcrypt.compare(candidatePassword, this.userPassword, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);
