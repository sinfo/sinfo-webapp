var User = require('./user');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;

module.exports = User.extend({
  url: cannonUrl+'/users/me',
  session: {
    token: ['string'],
  },
  derived: {
    authenticated: {
      deps: ['token'],
      fn: function () {
        return !!this.token;
      }
    },
  },
  ajaxConfig: function () {
    var self = this;
    return {
      headers: {
        'Authorization': 'Bearer ' + self.token
      },
    };
  }
});
