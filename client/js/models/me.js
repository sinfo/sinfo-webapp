var AmpersandModel = require('ampersand-model');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;

module.exports = AmpersandModel.extend({
  type: 'user',
  url: cannonUrl+'/users/me',
  props: {
    id: ['string'],
    name: ['string', true, ''],
    img: ['string'],
  },
  session: {
    token: ['string'],
  },
  derived: {
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url('+this.img+');';
      }
    },
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
