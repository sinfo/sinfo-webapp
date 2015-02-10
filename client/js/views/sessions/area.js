/*global app, alert*/
var log = require('bows')('sessions');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakerView = require('client/js/views/sessions/view');

module.exports = PageView.extend({
  template: templates.partials.sessions.area,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, SpeakerView, this.queryByHook('sessions-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching sessions');
    this.collection.fetch();
    return false;
  }
});
