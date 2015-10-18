/*global app*/
var log = require('bows')('session-speaker-view');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var SpeakerView = require('client/js/views/speakers/view');
var SpeakersArea = require('client/js/views/speakers/area');

module.exports = SpeakersArea.extend({
  initialize: function() {
    var self = this;
    if(app.speakers.current.length) {
      return self.filterSpeakers();
    }

    app.speakers.current.fetch({ success: function() {
      self.filterSpeakers();
    }});
  },
  filterSpeakers: function() {
    var self = this;
    if(!self.model.speakersDetails.length) {
      var sessionSpeakerIds = self.model.speakers.serialize()
        .filter(function(s) { return s.id; })
        .map(function(s) { return s.id; });

      self.model.speakersDetails = new SubCollection(app.speakers.current, {
        filter: function (speaker) {
          return sessionSpeakerIds.indexOf(speaker.id) != -1;
        }
      });
    }
    this.render();
  },
  render: function() {
    var self = this;
    this.renderWithTemplate();
    this.renderCollection(self.model.speakersDetails, SpeakerView, this.queryByHook('session-speaker-view'));
  }
});
