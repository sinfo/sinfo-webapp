var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  type: 'user',
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
