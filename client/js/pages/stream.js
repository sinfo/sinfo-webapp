var PageView = require('./base');
var templates = require('../templates');
var SessionsView = require('client/js/views/live/liveSessions');
var moment = require('moment');

var UPDATE_INTERVAL = 5000;

module.exports = PageView.extend({
  pageTitle: 'Live Stream',
  template: templates.pages.stream,
  initialize: function () {
    var self = this;
    self.interval = setInterval(function () {
      self.update();
    }, UPDATE_INTERVAL);

    self.update();
  },
  update: function () {
    var self = this;
    app.sessions.fetch();

    var liveStreamSessions = app.sessions.filter(function (session) {
      var now = new Date();
      return moment(session.date).isSame(now, 'day') && session.isHappening && session.isHappening;
    });

    self.showStream = liveStreamSessions.length > 0;
  },
  props: {
    showStream: 'boolean'
  },
  bindings: {
    'showStream': {
      type: 'toggle',
      hook: 'live-stream',
    }
  },
  subviews: {
    speakers: {
      container: '[data-hook=live-sessions]',
      parent: this,
      prepareView: function (el) {
        var self = this;
        return new SessionsView({
          el: el
        });
      }
    },
  },
});
