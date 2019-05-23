/* Database Configurations */


'use strict';


/* Mongoose */
const mongoose = require('mongoose');

/* Set up default mongoose connection */
let mongoDB = require('./general').DATABASE;

mongoose.connect(mongoDB, {
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on("error", function (err) {
    throw err;
});


module.exports = db;
