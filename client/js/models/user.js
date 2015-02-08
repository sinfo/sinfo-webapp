var AmpModel = require('ampersand-model');
var AmpState = require('ampersand-state');

var Job = AmpState.extend({
  props: {
    startup: 'boolean',
    internship: 'boolean',
    start: 'date',
  }
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
  },
  derived: {
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url('+this.img+');';
      }
    },
  },
});
