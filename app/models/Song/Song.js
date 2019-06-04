/* Song Model */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SongSchema = Schema({
    songName: {
        type: String,
        unique: true,
        required: [true, "The song name is required!"]
    },

    memoryAddress: {
        type: String,
        validate: function (f) {
            return /(^$)|(([a-zA-Z0-9\s_\\.\-\(\):])+(.)+(wav|mp3|aiff|aac|ogg|wma|alac)$)/.test(f)
        },
        message: props => `${props.value} is not a valid song! Valid formats: wav, mp3, aiff, aac, ogg, wma, alac`
    }

});

module.exports = mongoose.model('Song', SongSchema);

