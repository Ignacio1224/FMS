/* SERVER */


'use strict';


const app = require('./config/server');
const database = require('./config/dbconnection');
const general = require('./config/general');

// Connect to Database
console.log(`Connection established on ${general.DATABASE}`);

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`IgnoDB running on ${general.SERVER_URL}:${app.get('port')}`);
});
