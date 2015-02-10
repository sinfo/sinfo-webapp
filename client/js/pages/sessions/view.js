/*global app, alert*/
var log = require('bows')('sessions');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakersView = require('client/js/views/sessions/sessionSpeakers');
var PartnerView = require('client/js/views/sessions/sessionPartners');
var tickets = require('client/js/helpers/tickets');


module.exports = PageView.extend({
  pageTitle: 'View session',
  template: templates.pages.sessions.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.kind': {
      hook: 'kind'
    },
    'model.description': [
      { type: 'toggle', hook: 'description' },
      { selector: '[data-hook~=description] div' },
    ],
    'model.place': [
      { type: 'toggle', hook: 'place' },
      { selector: '[data-hook~=place] span' },
    ],
    'model.startParsed': [
      { type: 'toggle', hook: 'date' },
      { selector: '[data-hook~=date] span' },
    ],
    'model.img': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.descriptionHtml': {
      type: 'innerHTML',
      hook: 'descriptionHtml'
    },
    'model.hasSpeakers': { type: 'toggle', hook: 'session-speakers' },
    'model.hasCompanies': { type: 'toggle', hook: 'session-partners' },
    'model.needsTicket': { type: 'toggle', hook: 'ticket' },
    'model.canRegist': { type: 'toggle', hook: 'action-get-ticket' },
    'model.canConfirm': { type: 'toggle', hook: 'action-confirm-ticket' },
    'model.canVoid': { type: 'toggle', hook: 'action-void-ticket' },
  },
  events: {
    'click [data-hook~=action-get-ticket]': 'handleGetTicket',
    'click [data-hook~=action-void-ticket]': 'handleVoidTicket',
    'click [data-hook~=action-confirm-ticket]': 'handleConfirmTicket',
  },
  initialize: function (spec) {
    var self = this;
    app.sessions.getOrFetch(spec.id, {all: true}, function (err, model) {
      if (err) {
        return log.error('couldnt find a session with id: ' + spec.id);
      }
      self.model = model;
      log('Got session', model.name);

      tickets.getTicket(spec.id, function (err, ticket) {
        log('Got ticket', ticket);
      });
    });
  },
  handleGetTicket: function () {
    if(!app.me.authenticated) {
      return app.navigateToLogin();
    }

    tickets.registerTicket(this.model.id, function(err, ticket) {
      if (err) {
        return log.error('couldn\'t register ticket', err);
      }
      log('registered ticket', ticket);
    });
  },
  handleVoidTicket: function () {
    if(!app.me.authenticated) {
      return app.navigateToLogin();
    }

    tickets.voidTicket(this.model.id, function(err, ticket) {
      if (err) {
        return log.error('couldn\'t register ticket', err);
      }
      log('registered ticket', ticket);
    });
  },
  handleConfirmTicket: function () {
    if(!app.me.authenticated) {
      return app.navigateToLogin();
    }

    tickets.confirmTicket(this.model.id, function(err, ticket) {
      if (err) {
        return log.error('couldn\'t register ticket', err);
      }
      log('registered ticket', ticket);
    });
  },
  subviews: {
    speakers: {
      container: '[data-hook=session-speakers] div',
      parent: this,
      waitFor: 'model.speakers',
      prepareView: function (el) {
        var self = this;
        return new SpeakersView({
          el: el,
          model: self.model
        });
      }
    },
    partners: {
      container: '[data-hook=session-partners] div',
      parent: this,
      waitFor: 'model.companies',
      prepareView: function (el) {
        var self = this;
        return new PartnerView({
          el: el,
          model: self.model
        });
      }
    }
  }
});