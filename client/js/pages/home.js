var PageView = require('./base');
var templates = require('../templates');
var SpeakersArea = require('client/js/views/speakers/area');
var PartnersArea = require('client/js/views/partners/area');


module.exports = PageView.extend({
  pageTitle: 'SINFO Webapp',
  template: templates.pages.home,
  subviews: {
    speakers: {
      container: '[data-hook=speakers-area]',
      prepareView: function (el) {
        return new SpeakersArea({
          el: el,
          collection: app.speakers
        });
      }
    },
    partners: {
      container: '[data-hook=partners-area]',
      prepareView: function (el) {
        return new PartnersArea({
          el: el,
          collection: app.partners
        });
      }
    },
  }
});
