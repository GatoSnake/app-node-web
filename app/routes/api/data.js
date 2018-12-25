'use strict';

const express = require('express');
const router = express.Router();

const dataService = rootRequire('./app/services/data');

// Get data
router.get('/', async (req, res) => {
  let result = await dataService.getAll();
  res.status(200).json({
    data: result,
    total: result.length
  });
});

//Insert data
router.post('/', async (req, res, next) => {
  try {
    let data = await dataService.save(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
