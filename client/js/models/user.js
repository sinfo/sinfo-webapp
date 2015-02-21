var AmpModel = require('ampersand-model');
var AmpState = require('ampersand-state');
var Session = require('./session');
var AmpCollection = require('ampersand-collection');

var Job = AmpState.extend({
  props: {
    startup: 'boolean',
    internship: 'boolean',
    start: 'date',
  }
});

var SessionCollection = AmpCollection.extend({
  model: Session
});

module.exports = AmpModel.extend({
  type: 'user',
  props: {
    id: 'string',
    name: 'string',
    img: 'string',
    mail: 'string',
    area: 'string',
    skills: 'array',
  },
  children: {
    job: Job
  },
  collections: {
    sessionDetails: SessionCollection,
  },
  derived: {
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url('+this.img+');';
      }
    },
    viewUrl: {
      deps: ['id'],
      fn: function () {
        return '/users/'+this.id;
      }
    },
  },
});
