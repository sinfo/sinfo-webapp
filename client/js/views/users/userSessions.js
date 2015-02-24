/*global app*/
var log = require('bows')('user-session-view');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var SessionView = require('client/js/views/sessions/view');
var tickets = require('client/js/helpers/tickets');
var Session = require('client/js/models/session');
var AmpersandCollection = require('ampersand-collection');



module.exports = View.extend({
  bindings: {
    'sectiontitle':'[data-hook~=title]',
  },
  template:templates.partials.users.userSessions,
  render: function(){

    log(this);
    if(this.model.sessionDetails.length == 0)
        self.sectiontitle = '';

    if(this.model.sessionDetails.length > 0)
        self.sectiontitle='Your Sessions';

    this.renderWithTemplate();
    log('rendering');

    this.renderCollection(this.model.sessionDetails, SessionView, this.queryByHook('user-sessions'));
  },
  initialize: function() {
    var self = this;

    log('initialize');

    if(app.sessions.length ){
      return self.filter();
    }

    app.sessions.fetch({ success: function() {
        self.filter();
      }});
  },
  sectiontitle: '',
  filter: function(){
    var self = this;
    tickets.getUserSessions(self.model.id, function (err, ticket) {
      var aux = ticket.map(function(t){
        return t.session;
      });

      log('Session Ids', aux);

      self.model.sessionDetails = new SubCollection(app.sessions, {
        filter: function (session) {
          return aux.indexOf(session.id) != -1;
        }
      });
      self.render();
    });
  },
});