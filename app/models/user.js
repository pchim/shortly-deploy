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

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  var hash = this.password;
  bcrypt.compare(attemptedPassword, hash, function(err, isMatch) {
    callback(isMatch);
  }).bind(this);
};
userSchema.methods.hashPassword = function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
};

userSchema.pre('save', function(next){

  this.hashPassword(next);

  // if (next) {
  //   this.hashPassword(next);
  // } else {
  //   this.hashPassword();
  // }


}); 

let User = db.model('User', userSchema);

module.exports = User;
