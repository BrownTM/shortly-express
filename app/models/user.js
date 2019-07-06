var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var salt = bcrypt.genSaltSync(10);
      return new Promise ((resolve, reject) => {
        bcrypt.hash(model.attributes.password, salt, null, (err, hash) => {
          if (err) { reject(err); }
          model.set('password', hash);
          model.set('salt', salt);
          resolve(hash);
        });
      });
    }, this);
  },

  checkPassword: function(password, hash, salt) {
    var hashed = bcrypt.hashSync(password, salt);
    return hashed === hash;
    // , (err, result) => {
    //   if (err) {
    //     throw(err);
    //   } else {
    //     console.log('RESULT', result);
    //     return result;
    //   }
  }
});

module.exports = User;