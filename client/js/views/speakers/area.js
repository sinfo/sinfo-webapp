/*global app, alert*/
var log = require('bows')('speakers');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakerView = require('client/js/views/speakers/view');

module.exports = PageView.extend({
  pageTitle: 'Speakers',
  template: templates.partials.speakers.area,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, SpeakerView, this.queryByHook('speakers-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching speakers');
    this.collection.fetch();
    return false;
  }
});
