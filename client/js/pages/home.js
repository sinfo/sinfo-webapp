var PageView = require('./base');
var templates = require('../templates');
var SpeakersArea = require('client/js/views/speakers/area');


module.exports = PageView.extend({
  pageTitle: 'SINFO Webapp',
  template: templates.pages.home,
  subviews: {
    participations: {
      container: '[data-hook=speakers-area]',
      prepareView: function (el) {
        return new SpeakersArea({
          el: el,
          collection: app.speakers
        });
      }
    },
  }
});
