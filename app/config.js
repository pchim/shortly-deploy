let path = require('path');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let url = 'mongodb://localhost:4568/db/shortly';
mongoose.connect(url);

let urlSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number},
  {timestamps: true}
);

let userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
},
{
  timestamps: true
});

let Url = mongoose.model('Url', urlSchema);
let User = mongoose.model('User', userSchema);

db.Url = Url;
db.User = User;
module.exports = db;
