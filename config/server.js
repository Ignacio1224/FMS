const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const serverPort = require('./general').SERVER_PORT;
const routes = require('../app/routes/Index');

// Settings
app.set('port', serverPort);


// Middelware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/ignodb', routes);

module.exports = app;

