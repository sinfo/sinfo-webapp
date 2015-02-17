var AmpCollection = require('ampersand-rest-collection');
var user = require('./user');
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('users');

module.exports = AmpCollection.extend({
  model: user,
  url:  config.cannonUrl + '/users',
  ajaxConfig: function () {
    return {
      headers: {
        'Authorization': 'Bearer ' + app.me.token
      },
    };
  }
});