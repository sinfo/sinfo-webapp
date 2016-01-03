/*global app*/
var AmpState = require('ampersand-state');
var AmpModel = require('ampersand-model');
var AmpCollection = require('ampersand-collection');

module.exports = AmpModel.extend({
  props: {
    id: ['string'],
    name: ['string'],
    img: ['string'],
    twitter: ['string'],
    github: ['string'],
    mail: ['string']
  },

  derived: {
    mailtoUrl: {
      deps: ['mail'],
      fn: function () {
        return 'mailto:' + this.mail;
      }
    },
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url('+this.img+');';
      }
    },
    twitterUrl: {
      deps: ['twitter'],
      fn: function () {
        return 'https://www.twitter.com/'+this.twitter;
      }
    },
    githubUrl: {
      deps: ['github'],
      fn: function () {
        return 'https://www.github.com/'+this.github;
      }
    }
  },
  parse: function (attrs) {
    return attrs;
  },
});
