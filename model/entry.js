const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    userID: Number,
    entry: String
  });

module.exports = mongoose.model('entries', EntrySchema);

