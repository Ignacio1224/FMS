/* Viewed Model */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./FKHelper');


const ViewedSchema = Schema({
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

    _filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        validate: {
            validator: function (v) {
                return FKHelper(mongoose.model('Film'), v);
            },
            message: `Film does not exist`
        },
        required: [true, "The film name is required!"]
    },

    rating: {
        type: Number,
        min: 0,
        max: 10
    },

    viewedDate: {
        type: Date,
        default: Date.now
    }

});

ViewedSchema.index({
    '_userId': 1, 
    '_filmId': 1
}, { 
    unique: true 
});

// ViewedSchema.path('_userId').validate(function (v) {
//     return this._userId == this._filmId;
// }, 'userId and filmId can not be the same');

// ViewedSchema.path('_filmId').validate(function (v) {
//     return v === this._userId;
// });

module.exports = mongoose.model('Viewed', ViewedSchema);
