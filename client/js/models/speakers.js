var AmpCollection = require('ampersand-rest-collection')
var speaker = require('./speaker')
var config = require('client/js/helpers/clientconfig')
var log = require('bows')('speakers')

module.exports = AmpCollection.extend({
  model: speaker,
  url: config.deckUrl + '/api/speakers',
  ajaxConfig: function () {
    return {
      headers: {
        'Only-Public': true
      }
    }
  }
})
