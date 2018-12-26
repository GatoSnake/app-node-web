'use strict';

const { MongoClient, GridFSBucket } = require('mongodb');

module.exports = (app) => {
  logger.info('Initializing mongo ...');

  // Create a new MongoClient
  const client = new MongoClient(`${_config.db.url}/${_config.db.dbName}`, { useNewUrlParser: true });

  // Use connect method to connect to the Server
  logger.info(`Connecting to mongo database (${process.env.NODE_ENV}) ...`);
  client.connect((err) => {
    if (err) {
      logger.error(`Mongoose default connection error: ${err}`);
      process.exit(0);
    }
    logger.info("Connected successfully to mongo server");
    global._mongodb = client.db(_config.db.dbname);
    global._gridfs = new GridFSBucket(_mongodb);

    //Create indexs
    logger.info("Creating indexs db ...");
    const collection = _mongodb.collection('data-collection');
    collection.createIndex({ name: 1 }, { unique: true }, (err, result) => {
      if (err) {
        logger.error(err);
        process.exit(0);
      }
      logger.info('Indexs created');
      app.emit('app-ready');
    });

  });

  process.on('SIGINT', () => {
    client.close();
    logger.warn('Mongo connection disconnected through app termination');
    process.exit(0);
  });
};
