var AmpModel = require('ampersand-model');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;

module.exports = AmpModel.extend({
  url: cannonUrl+'/files/me',
  props: {
    id: 'string',
    user: 'string',
    name: 'string',
    kind: 'string',
    extension: 'string',
    updated: 'date',
    created: 'date',
  },
  ajaxConfig: function () {
    return {
      headers: {
        'Authorization': 'Bearer ' + app.me.token
      },
    }
  }
});
