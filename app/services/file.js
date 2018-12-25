'use strict';

const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

const fileService = {};

fileService.save = (file) => {
  return new Promise((resolve, reject) => {
    logger.info(`Uploading file "${file.originalname}" ...`);
    let uploadStream = _gridfs.openUploadStream(file.originalname);
    let id = uploadStream.id;
    fs.createReadStream(file.path)
      .pipe(uploadStream)
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        uploadStream.destroy();
        fs.unlinkSync(file.path);
        logger.info(`File "${file.originalname}" saved`);
        resolve({ '_id': id, 'filename': file.originalname });
      });
  });
};

fileService.get = (fileId) => {
  return new Promise((resolve, reject) => {
    logger.info(`Getting file id "${fileId}" ...`);
    let tempFile = `${_config.temp.downloads}/${fileId}_${new Date().getTime()}`;
    let downloadStream = _gridfs.openDownloadStream(new ObjectID(fileId));
    downloadStream
      .pipe(fs.createWriteStream(tempFile))
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        var filesQuery = _mongodb.collection('fs.files')
          .findOne({ _id: new ObjectID(fileId) }, function(error, docs) {
            downloadStream.destroy();
            logger.info(`File "${docs.filename}" recovered`);
            resolve({ path: tempFile, filename: docs.filename });
          });
      });
  });
};

module.exports = fileService;
