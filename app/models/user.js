let db = require('../config');
let Schema = db.Schema;
let bcrypt = require('bcrypt-nodejs');
let Promise = require('bluebird');

let userSchema = new Schema({
  username: {type: String, unique: true},
  password: String 
},
{
  timestamps: true
});

userSchema.tableName = 'users';
userSchema.hasTimestamps = true;
userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};
userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};
userSchema.pre('save', function(next){
  this.hashPassword;
  if (next) {
    next();
  }}); 

let User = db.model('User', userSchema);

module.exports = User;
