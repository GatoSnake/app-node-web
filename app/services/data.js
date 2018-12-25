'use strict';

const dataService = {};

dataService.save = (data) => {
  return new Promise((resolve, reject) => {
    const collection = _mongodb.collection('data-collection');
    collection.insertMany([
      data
    ], (err, result) => {
      if (err) reject(err);
      else {
        logger.info("Inserted documents into the data-collection");
        resolve(data);
      }
    });
  });
};

dataService.getAll = () => {
  return new Promise((resolve, reject) => {
    const collection = _mongodb.collection('data-collection');
    collection.find({}).toArray((err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};

module.exports = dataService;
