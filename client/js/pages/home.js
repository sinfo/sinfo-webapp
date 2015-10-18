var PageView = require('./base');
var templates = require('../templates');
var SpeakersArea = require('client/js/views/speakers/gridArea');
var MembersArea = require('client/js/views/members/gridArea');
var Contacts = require('client/js/views/contacts');

module.exports = PageView.extend({
  pageTitle: 'SINFO',
  template: templates.pages.home,
  subviews: {
    currentSpeakers: {
      container: '[data-hook=speakers-current]',
      prepareView: function (el) {
        return new SpeakersArea({
          el: el,
          collection: app.speakers.current
        });
      }
    },
    pastSpeakers: {
      container: '[data-hook=speakers-area-past] div',
      prepareView: function (el) {
        return new SpeakersArea({
          el: el,
          collection: app.speakers.past
        });
      }
    },
    members: {
      container: '[data-hook=sinfo-team] div',
      prepareView: function (el) {
        return new MembersArea({
          el: el,
          collection: app.members
        });
      }
    },
    contacts: {
      container: '[data-hook=meet-us] div',
      prepareView: function (el) {
        return new Contacts({
          el: el,
        });
      }
    }
  }
});
