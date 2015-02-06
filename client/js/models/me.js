var AmpModel = require('ampersand-model');
var AmpState = require('ampersand-state');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;

var Job = AmpState.extend({
  props: {
    startup: 'boolean',
    internship: 'boolean',
    start: 'date',
  }
});

module.exports = AmpModel.extend({
  type: 'user',
  url: cannonUrl+'/users/me',
  props: {
    id: 'string',
    name: 'string',
    img: 'string',
    mail: 'string',
    role: 'string',
    area: 'string',
    skills: 'array',
  },
  session: {
    token: ['string'],
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
    authenticated: {
      deps: ['token'],
      fn: function () {
        return !!this.token;
      }
    },
  },
  ajaxConfig: function () {
    var self = this;
    return {
      headers: {
        'Authorization': 'Bearer ' + self.token
      },
    };
  }
});
