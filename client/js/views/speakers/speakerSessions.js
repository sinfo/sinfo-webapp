/*global app*/
var log = require('bows')('speaker-sessions');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var SessionView = require('client/js/views/sessions/view');
var SessionsArea = require('client/js/views/sessions/area');

module.exports = SessionsArea.extend({
  initialize: function() {
    var self = this;
    if(app.sessions.length) {
      return self.filterSessions();
    }

    app.sessions.fetch({ success: function() {
      self.filterSessions();
    }});
  },
  filterSessions: function() {
    var self = this;
    if(!self.model.sessionsDetails.length) {
      self.model.sessionsDetails = new SubCollection(app.sessions, {
        filter: function (session) {
          return session.speakers.get(self.model.id) != null;
        }
      });
    }
    this.render();
  },
  render: function() {
    var self = this;
    this.renderWithTemplate();
    this.renderCollection(self.model.sessionsDetails, SessionView, this.queryByHook('speaker-sessions-view'));
  }
});
