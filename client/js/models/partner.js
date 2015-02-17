/*global app*/
var AmpState = require('ampersand-state');
var AmpModel = require('ampersand-model');
var AmpCollection = require('ampersand-collection');
var options = require('options');
var marked = require('client/js/helpers/marked');
var _ = require('client/js/helpers/underscore');

module.exports = AmpModel.extend({
  props: {
    id: ['string'],
    name: ['string'],
    img: ['string'],
    advertisementLvl: ['string']
  },
  derived: {
    thread: {
      deps: ['id'],
      fn: function () {
        return 'company-' + this.id;
      }
    },
    threadKind: {
      fn: function () {
        return 'company';
      }
    },
    adv: {
      deps: ['advertisementLvl'],
      fn: function () {
        if(this.model.advertisementLvl === 'max'){
          return 'Maximum';
        }
        if(this.model.advertisementLvl === 'exclusive'){
          return 'Exclusive';
        }
        return 'Nothing';
      }
    },
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url('+this.img+');';
      }
    },
  },
});