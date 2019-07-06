var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      bcrypt.hash(model.attributes.password, null, null, (err, result) => {
        if (err) {
          throw(err);
        } else {
          model.set('password', result);
        }
      });
      // console.log('HASHED', hashed);
      // hashed.update(model.get('password'));
    });
  }

});

module.exports = User;