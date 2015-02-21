/*global app*/
var log = require('bows')('session-speaker-view');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var SessionView = require('client/js/views/sessions/view');
var tickets = require('client/js/helpers/tickets');
var Session = require('client/js/models/session');
var AmpersandCollection = require('ampersand-collection');

module.exports = View.extend({
  template:templates.partials.users.userSessions,
  render: function(){
    this.renderWithTemplate();
    log(this);
    this.renderCollection(this.model.sessionDetails, SessionView, this.queryByHook('user-sessions'));
  },
  initialize: function() {
    var self = this;

    self.filter(self.model);
  },
  filter: function(model){
    var self = this;
    tickets.getUserSessions(model.id, function (err, ticket) {
      var aux = ticket.map(function(t){
        return t.session;
      });

      log('Session Ids', aux);

      if(!app.sessions.length ){
        app.sessions.fetch({
          success: function() {

            model.sessionDetails = new SubCollection(app.sessions, {
              filter: function (session) {
                return aux.indexOf(session.id) != -1;
              }
            });

            log('this page... ',self);
            self.model = model;
            self.render();
          }
        });
      }
    });
  },
});