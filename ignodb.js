'use strict';

const app = require('./config/server');
const database = require('./config/dbconnection');

// Connect to Database
if (database) {
    console.log('Connection established...');
    
    // Starting the server
    app.listen(app.get('port'), () => {
        console.log(`IgnoDB running on http>//localhost:${app.get('port')}`);
    });
} else {
    console.log('Fail to connect!');
}

