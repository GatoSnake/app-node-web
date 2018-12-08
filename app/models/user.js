'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  lastname: String,
  age: String,
  address: String,
  city: String,
  country: String,
  date: {
    type: Date,
    default: Date.now
  }
});

/* Methods user */

userSchema.methods = {};

userSchema.statics = {};

const User = mongoose.model('User', userSchema);

module.exports = User;
