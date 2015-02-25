/*global app*/
var log = require('bows')('live-sessions');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var moment = require('moment');
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

    app.sessions.on('sync', function() {
      self.filterSessions();
    });
  },
  filterSessions: function() {
    var self = this;
    self.collection = new SubCollection(app.sessions, {
      comparator: 'date',
      filter: function (session) {
        var now = new Date();
        return moment(session.date).isSame(now, 'day') && now < session.end;
      }
    });
    this.render();
  },
  render: function() {
    var self = this;
    this.renderWithTemplate();

    log('rendering sessions');

    if(!self.collection) {
      return;
    }

    this.renderCollection(self.collection, SessionView, this.queryByHook('live-sessions-view'));
  }
});
