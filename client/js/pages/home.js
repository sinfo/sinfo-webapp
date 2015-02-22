var PageView = require('./base');
var templates = require('../templates');
var SpeakersArea = require('client/js/views/speakers/gridArea');
var PartnersArea = require('client/js/views/partners/area');
var SessionsCalendar = require('client/js/views/sessions/calendar');


module.exports = PageView.extend({
  pageTitle: 'SINFO Webapp',
  template: templates.pages.home,
  subviews: {
    speakers: {
      container: '[data-hook=speakers-area] div',
      prepareView: function (el) {
        return new SpeakersArea({
          el: el,
          collection: app.speakers
        });
      }
    },
    partners: {
      container: '[data-hook=partners-area] div',
      prepareView: function (el) {
        return new PartnersArea({
          el: el,
          collection: app.partners
        });
      }
    },
    sessions: {
      container: '[data-hook=sessions-calendar] div',
      prepareView: function (el) {
        return new SessionsCalendar({
          el: el,
          collection: app.sessions
        });
      }
    },
  }
});
