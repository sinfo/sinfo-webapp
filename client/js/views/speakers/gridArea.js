/*global app, alert*/
var log = require('bows')('speakers');
var SpeakerArea = require('./area');
var templates = require('client/js/templates');
var SpeakerView = require('client/js/views/speakers/gridView');

module.exports = SpeakerArea.extend({
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, SpeakerView, this.queryByHook('speakers-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
});
