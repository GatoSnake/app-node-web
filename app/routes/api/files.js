'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: _config.temp.uploads });

const fileService = rootRequire('./app/services/file');

/* Get file. */
router.get('/:id', async (req, res, next) => {
  try {
    let file = await fileService.get(req.params.id);
    res.status(200).download(file.path, file.filename, (err) => {
      if (err) throw new Error(err);
      fs.unlinkSync(file.path);
    });
  } catch (err) {
    next(err);
  }
});

/* Insert file. */
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    let file = await fileService.save(req.file);
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
