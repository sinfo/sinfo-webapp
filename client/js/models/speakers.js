var AmpCollection = require('ampersand-rest-collection');
var speaker = require('./speaker');
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('speakers');

var Speakers = AmpCollection.extend({
  model: speaker,
  ajaxConfig: function () {
    return {
      headers: {
        'Only-Public': true
      },
    };
  }
});

module.exports = function (currentEvent) {
  return {
    current:  Speakers.extend({
      url:  config.deckUrl + '/api/speakers?event=' + currentEvent
    }),
    past:  Speakers.extend({
      url:  config.deckUrl + '/api/speakers?participations=false&event=' + currentEvent
    })
  }
};
