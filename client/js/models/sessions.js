var AmpCollection = require('ampersand-rest-collection');
var session = require('./session');
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('sessions');

module.exports = AmpCollection.extend({
  model: session,
  url: config.deckUrl + '/api/sessions',
  ajaxConfig: function () {
    return {
      headers: {
        'Only-Public': true
      },
    };
  }
});