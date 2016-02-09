/*global app, alert*/
var log = require('bows')('speakers');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakersArea = require('client/js/views/speakers/gridArea');

module.exports = PageView.extend({
  pageTitle: 'Speakers',
  template: templates.pages.speakers.list,
  subviews: {
    speakers: {
      container: '[data-hook=speakers-area] div',
      prepareView: function (el) {
        var self = this
        self.collection.fetch()
        return new SpeakersArea({
          el: el,
          collection: self.collection
        });
      }
    },
  }
});
