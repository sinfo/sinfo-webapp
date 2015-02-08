/*global app, alert*/
var log = require('bows')('sessions');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakersView = require('client/js/views/sessionSpeaker');
var PartnerView = require('client/js/views/sessionPartner');


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
    'model.hasSpeakers': [
      { type: 'toggle', hook: 'session-speakers' },
    ],
    'model.hasCompanies': [
      { type: 'toggle', hook: 'session-partners' },
    ],
    'model.needsTicket': [
      { type: 'toggle', hook: 'ticket' },
    ],
  },
  events: {
    'click [data-hook~=action-get-ticket]': 'handleGetTicket',
  },
  initialize: function (spec) {
    var self = this;
    app.sessions.getOrFetch(spec.id, {all: true}, function (err, model) {
      if (err) {
        log.error('couldnt find a session with id: ' + spec.id);
      }
      self.model = model;
      log('Got session', model.name);
    });
  },
  handleGetTicket: function () {
    if(!app.me.authenticated) {
      return app.navigate('/auth/login?r=/sessions/'+this.model.id);
    }


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