/* Viewed Model */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./FKHelper');
const bcrypt = require('bcrypt');
const passwordSalt = require('../../config/general').PASSWORD_SALT;

const PasswordResetSchema = Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: function (v) {
                return FKHelper(mongoose.model('User'), v);
            },
            message: `User does not exist`
        },
        required: [true, "The user is required!"]
    },

    code: {
        type: String,
        required: [true, "The code is required!"]
    }

});

PasswordResetSchema.index({
    '_userId': 1
}, {
    unique: true
});

PasswordResetSchema.pre('save', function (next) {
    let pr = this;
    if (!pr.isModified('code')) return next();

    bcrypt.genSalt(passwordSalt, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(pr.code, salt, function (err, hash) {
            if (err) return next(err);
            pr.code = hash;
            next();
        });
    });
});

PasswordResetSchema.methods.compareCode = function (candidateCode, cb) {
    bcrypt.compare(candidateCode, this.code, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);

