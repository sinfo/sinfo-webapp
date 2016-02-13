var AmpCollection = require('ampersand-rest-collection');
var member = require('./member');
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('members');

module.exports = function (currentEvent) {
  return AmpCollection.extend({
    model: member,
    url:  config.deckUrl + '/api/members?event=' + currentEvent,
    comparator: 'name',
    ajaxConfig: function () {
      return {
        headers: {
          'Only-Public': true
        },
      };
    }
  });
};
