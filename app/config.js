let path = require('path');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let url = 'mongodb://localhost:27017/db/shortly';
mongoose.connect(url);

module.exports = mongoose;
