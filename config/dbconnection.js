/* Database Configurations */


'use strict';
const mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = require('./general').DATA_BASE;

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on("error", () => {return false});
db.once("open", () => {return false});

module.exports = db;
