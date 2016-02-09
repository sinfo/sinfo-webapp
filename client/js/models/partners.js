var AmpCollection = require('ampersand-rest-collection')
var partner = require('./partner')
var config = require('client/js/helpers/clientconfig')

module.exports = AmpCollection.extend({
  model: partner,
  url: config.deckUrl + '/api/companies',
  ajaxConfig: function () {
    return {
      headers: {
        'Only-Public': true
      },
    }
  }
})
