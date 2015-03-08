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
  autoRender: false,
  template: templates.partials.sessions.area,
  render: function(){

    log(this);
    if(this.model.sessionDetails.length == 0)
        self.sectiontitle = '';

    if(this.model.sessionDetails.length > 0)
        self.sectiontitle='Your Sessions';

    this.renderWithTemplate();
    log('rendering');

    this.renderCollection(this.model.sessionDetails, SessionView, this.queryByHook('sessions-list'));
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
    log('Requesting the Session ids for', self.model.id);
    tickets.getUserSessions(self.model.id, function (err, ticket) {
      log('Session Ids', ticket);

      self.model.sessionDetails = new SubCollection(app.sessions, {
        filter: function (session) {
          return ticket.indexOf(session.id) != -1;
        }
      });
      self.render();
    });
  },
});