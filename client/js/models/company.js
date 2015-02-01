/*global app*/
var AmpState = require('ampersand-state');
var AmpModel = require('ampersand-model');
var AmpCollection = require('ampersand-collection');
var options = require('options');
var marked = require('client/js/helpers/marked');
var _ = require('client/js/helpers/underscore');
var log = require('bows')('company');

module.exports = AmpModel.extend({
  props: {
    id: ['string'],
    name: ['string'],
    description: ['string'],
    img: ['string'],
    storedImg: ['string'],
    site:['string'],
    area:['string'],
    updated:['string']
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
    viewUrl: {
      deps: ['id'],
      fn: function () {
        return '/companies/' + this.id;
      }
    },
    templateUrl: {
      deps: ['id'],
      fn: function () {
        return '/templates/companies/' + this.id;
      }
    },
    startupTemplateUrl: {
      deps: ['id'],
      fn: function () {
        return '/templates/startups/' + this.id;
      }
    },
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url('+this.storedImg+');';
      }
    },
    descriptionHtml: {
      deps: ['description'],
      fn: function () {
        return this.description && marked(this.description) || '';
      },
    },
  },
  serialize: function () {
    var res = this.getAttributes({props: true}, true);
    _.each(this._children, function (value, key) {
        res[key] = this[key].serialize();
    }, this);

    delete res.storedImg;
    return res;
  },
});