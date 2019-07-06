var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      return new Promise ((resolve, reject) => {
        bcrypt.hash(model.attributes.password, null, null, (err, hash) => {
          if (err) { reject(err); }
          model.set('password', hash);
          resolve(hash);
        });
      });
    }, this);
  }
});

module.exports = User;