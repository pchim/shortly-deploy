var db = require('../config');
var crypto = require('crypto');

let linkSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
  }
  {timestamps: true}
);

linkSchema.tableName = 'urls';
linkSchema.hasTimestamps = true;
linkSchema.methods.hashLink = function() {
      var shasum = crypto.createHash('sha1');
      shasum.update(this.get('url'));
      this.set('code', shasum.digest('hex').slice(0, 5));
    };
linkSchema.queue('hashLink');    

let Link = db.model('Url', linkSchema);


module.exports = Link;
