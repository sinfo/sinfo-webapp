var AmpCollection = require('ampersand-rest-collection');
var company = require('./company');
var config = require('clientconfig');
var log = require('bows')('companies');

module.exports = AmpCollection.extend({
  model: company,
  url: config.deckUrl + '/api/companies',
  ajaxConfig: function () {
    return {
      headers: {
        'Only-Public': true
      },
    };
  }
});