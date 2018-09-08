'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/todos-api';
exports.PORT = process.env.PORT || 8080;

// later on change http://local... to the location of my deploying app
module.exports = {
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
};


/* 
//New way of using the db >> needs to be tested
module.exports = {
    PORT: process.env.PORT || 8080,
    // other stuff
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
        "http://localhost:3000/api"
};
 */