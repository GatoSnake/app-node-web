'use strict';

const mongoose = require('mongoose');
const config = require('./');
const logger = rootRequire('./config/logger');

module.exports = () => {
  logger.info('Initializing mongoose ...');

  // connect to mongodb
  mongoose.connect(config.db, {
    useNewUrlParser: true
  });
  mongoose.Promise = global.Promise;
  var conn = mongoose.connection;

  // CONNECTION EVENTS
  // When successfully connected
  conn.on('connected', () => {
    logger.info(`Mongoose default connection open to ${config.db} (${(process.env.NODE_ENV ? process.env.NODE_ENV : 'development')})`);
  });

  // If the connection throws an error
  conn.on('error', (err) => {
    logger.error(`Mongoose default connection error: ${err}`);
    process.exit(0);
  });

  // When the connection is disconnected
  conn.on('disconnected', () => {
    logger.warn('Mongoose default connection disconnected');
  });

  // When the connection is open
  conn.once('open', () => {
    logger.info('Mongoose default connection is open');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

};
