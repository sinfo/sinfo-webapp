var AmpModel = require('ampersand-model')
var dateParser = require('client/js/helpers/dateParser')
var config = require('client/js/helpers/clientconfig')

module.exports = AmpModel.extend({
  urlRoot: config.deckUrl + '/api/events',
  props: {
    id: ['string'],
    name: ['string'],
    kind: ['string'],
    description: ['string'],
    date: ['date'],
    duration: ['date']
  },
  derived: {
    dateDetails: {
      deps: ['date', 'duration'],
      fn: function () { return dateParser(this.date, this.duration) }
    },
    dateStrings: {
      deps: ['dateDetails'],
      fn: function () {
        return {
          range: this.dateDetails.begin.day + ' - ' + this.dateDetails.end.day + ' ' + this.dateDetails.begin.month,
          year: this.dateDetails.begin.year
        }
      }
    }
  }
});
