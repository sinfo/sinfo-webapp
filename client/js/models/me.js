var AmpersandModel = require('ampersand-model');
var cannonUrl = require('clientconfig').cannonUrl;

module.exports = AmpersandModel.extend({
  type: 'user',
  url: cannonUrl+'/users/me',
  props: {
    id: ['number'],
    name: ['string', true, ''],
    photoUrl: ['string'],
  },
  session: {
    authenticated: ['boolean', true, false],
  },
  derived: {
    background: {
      deps: ['photoUrl'],
      fn: function () {
        return 'background-image:url('+this.photoUrl+');';
      }
    },
  }
});
