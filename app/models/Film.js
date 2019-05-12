/* Film Model */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FilmSchema = Schema({
    filmName: {
        type: String,
        unique: true,
        required: [true, "The film name is required!"]
    },

    filmDuration: {
        type: Number,
        min: 0,
        max: 1440,
        required: [true, "The film duration is required!"]
    },

    memoryAddress: {
        type: String,
        validate: function (f) {
            return /(^$)|(([a-zA-Z0-9\s_\\.\-\(\):])+(.)+(avi|wmv|flv|mpg|mp4|mov|3gp)$)/.test(f)
        },
        message: props => `${props.value} is not a valid film! Valid formats: avi, wmv, flv, mpg, mp4`
    }

});

module.exports = mongoose.model('Film', FilmSchema);
