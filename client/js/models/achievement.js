/*global app*/
var AmpModel = require('ampersand-model');
var log = require('bows')('achievement');
var Session = require('./session');

module.exports = AmpModel.extend({
  props: {
    id: ['string'],
    name: ['string'],
    session: ['string'],
    category: ['string'],
    description: ['string'],
    instructions: ['string'],
    img: ['string'],
    value: ['number'],
  },
  children: {
    sessionDetails: Session
  },
  derived: {
    viewUrl: {
      deps: ['id'],
      fn: function () {
        return '/achievements/' + this.id;
      }
    } 
  }
});