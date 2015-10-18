/*global app, alert*/
var log = require('bows')('speakers');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SessionsView = require('client/js/views/speakers/speakerSessions');

module.exports = PageView.extend({
  pageTitle: 'View speaker',
  template: templates.pages.speakers.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.img': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.background': {
      type: 'attribute',
      hook: 'img',
      name: 'style'
    },
    'model.title': {
      hook: 'title'
    },
    'model.descriptionHtml': [
      { type: 'toggle', hook: 'description' },
      { type: 'innerHTML', selector: '[data-hook~=description] div' },
    ],
    'model.access': {
      hook: 'access'
    },
  },
  initialize: function (spec) {
    var self = this;
    app.speakers.current.getOrFetch(spec.id, {add: false}, function (err, model) {
      if (err) {
        log.error('couldnt find a speaker with id: ' + spec.id);
      }
      self.model = model;
      log('Got speaker', model.name);
    });
  },
  subviews: {
    speakers: {
      container: '[data-hook=speaker-sessions] div',
      parent: this,
      waitFor: 'model.id',
      prepareView: function (el) {
        var self = this;
        return new SessionsView({
          el: el,
          model: self.model
        });
      }
    },
  },
});
