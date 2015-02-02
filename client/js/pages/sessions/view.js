/*global app, alert*/
var log = require('bows')('sessions');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakersView = require('client/js/views/sessionSpeaker');
var CompaniesView = require('client/js/views/sessionCompany');


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
    'model.place': {
      hook: 'place' 
    },
    'model.description': {
      hook: 'description'
    },
    'model.startParsed': {
      hook: 'start'
    },
    'model.endParsed': {
      hook: 'end'
    },
    'model.img': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.descriptionHtml': {
      type: 'innerHTML',
      hook: 'descriptionHtml'
    },
  },
  events: {
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
  subviews: {
    speakers: {
      container: '[data-hook=session-speakers]',
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
    companies: {
      container: '[data-hook=session-companies]',
      parent: this,
      waitFor: 'model.companies',
      prepareView: function (el) {
        var self = this;
        return new CompaniesView({
          el: el,
          model: self.model
        });
      }
    }
  }
});