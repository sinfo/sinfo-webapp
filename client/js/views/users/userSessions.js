/*global app*/
var log = require('bows')('session-speaker-view');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var SessionView = require('client/js/views/sessions/view');
var tickets = require('client/js/helpers/tickets');
var AmpersandCollection = require('ampersand-collection');

module.exports = View.extend({
  template:templates.partials.users.userSessions,
  bindings: {
  'model.name': '[data-hook~=name]',
  'model.viewUrl': {
    type: 'attribute',
    hook: 'action-view',
    name: 'href'
    },
  },
  initialize: function() {
    var self = this;
    if(app.sessions.length) {
      return self.filterSessions();
    }

    if(!app.sessions){
      app.sessions.fetchCollection();
    }
    var sessionDetails = app.sessions;

    tickets.getUserSessions(spec.id, function (err, ticket) {
      sessionDetails = sessionDetails.map(function (session){
        return ticket.indexOf(session.id)!=-1;
      });
    });

    sessionDetails = new AmpersandCollection(sessionDetails, {model: Session});

    this.renderWithTemplate();
    this.renderCollection(sessionDetails, SessionView, this.queryByHook('user-sessions'));
  },
});