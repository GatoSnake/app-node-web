'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Global functions
global.rootRequire = (pathfile) => require(__dirname + '/' + pathfile);
global._pathbase = (pathfile) => pathfile ? path.join(__dirname, pathfile) : __dirname;

// Bootstrap app
require('./config/');
require('./config/logger')();
require('./config/mongo')(app);
require('./config/middlewares')(app);
require('./config/routes')(app);

module.exports = app;
