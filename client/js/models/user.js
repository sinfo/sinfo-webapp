var AmpModel = require('ampersand-model');
var AmpState = require('ampersand-state');
var Session = require('./session');
var Achievement = require('./achievement');
var AmpCollection = require('ampersand-collection');
var AmpRestCollection = require('ampersand-rest-collection');
var config = require('config');

var Job = AmpState.extend({
  props: {
    startup: 'boolean',
    internship: 'boolean',
    start: 'date',
  }
});

var Points = AmpState.extend({
  props: {
    total: 'number',
    available: 'number'
  }
});

var SessionCollection = AmpCollection.extend({
  model: Session
});

var AchievementCollection = AmpRestCollection.extend({
  model: Achievement
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
    job: Job,
    points: Points
  },
  collections: {
    sessionDetails: SessionCollection,
    achievements: AchievementCollection
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
    skillsString: {
       deps: ['skills'],
       fn: function () {        
        return this.skills.join(", ")
       } 
    },
  },
});
