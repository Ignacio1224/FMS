/* SongLog Model */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('../Utils/FKHelper');

const SongLogSchema = Schema({
    songName: {
        type: String,
        
        required: [true, "The song is required!"]
    },

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

    actionDate : {
        type: Date,
        default: Date.now
    },

    action: {
        type: String,
        enum: ["del", "add", "get"],
        required: [true, "The action is needed"]
    }

});

module.exports = mongoose.model('SongLog', SongLogSchema);
