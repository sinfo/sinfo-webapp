var AmpersandModel = require('ampersand-model');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;

module.exports = AmpersandModel.extend({
  type: 'user',
  url: cannonUrl+'/users/me',
  props: {
    id: ['string'],
    name: ['string', true, ''],
    photoUrl: ['string'],
  },
  session: {
    authenticated: ['boolean', true, false],
    token: ['string'],
  },
  derived: {
    background: {
      deps: ['photoUrl'],
      fn: function () {
        return 'background-image:url('+this.photoUrl+');';
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
