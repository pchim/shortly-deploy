var db = require('../config');
var Schema = db.Schema;
var crypto = require('crypto');

let linkSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}},
  {timestamps: true}
);

linkSchema.methods.hashLink = function() {
      var shasum = crypto.createHash('sha1');
      shasum.update(this.url);
      this.code = shasum.digest('hex').slice(0, 5);
    };
linkSchema.pre('save', function(next){
  this.hashLink();
  if (next) {
    next();
  }});    


let Link = db.model('Url', linkSchema);


module.exports = Link;
