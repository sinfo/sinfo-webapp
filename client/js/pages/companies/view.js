/*global app, alert*/
var log = require('bows')('companies');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');

module.exports = PageView.extend({
  pageTitle: 'View company',
  template: templates.pages.companies.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.storedImg': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.historyHtml': {
      type: 'innerHTML',
      hook: 'history'
    },
    'model.area': {
      hook: 'area'
    },
    'model.descriptionHtml': {
      type: 'innerHTML',
      hook: 'description'
    },
  },
  initialize: function (spec) {
    var self = this;

    app.companies.getOrFetch(spec.id, {all: true}, function (err, model) {
      if (err) {
        log.error('couldnt find a company with id: ' + spec.id);
      }
      self.model = model;
      log('Got company', model.name);
    });
  }
});
