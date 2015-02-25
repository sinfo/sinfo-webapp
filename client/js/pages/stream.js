var PageView = require('./base');
var templates = require('../templates');
var SessionsView = require('client/js/views/live/liveSessions');


module.exports = PageView.extend({
  pageTitle: 'Live Stream',
  template: templates.pages.stream,
  initialize: function () {
    var self = this;
    self.interval = setInterval(function () {
      self.update();
    }, 60000);
  },
  update: function () {
    app.sessions.fetch();
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
