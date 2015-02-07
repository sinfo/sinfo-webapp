/*global app, alert*/
var log = require('bows')('users');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');

module.exports = PageView.extend({
  pageTitle: 'View user',
  template: templates.pages.users.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.background': {
      type: 'attribute',
      hook: 'img',
      name: 'style'
    },
    'model.area': [
      { type: 'toggle', hook: 'area' },
      { selector: '[data-hook~=area] div' },
    ],
    'model.skills': [
      { type: 'toggle', hook: 'skills' },
      { selector: '[data-hook~=skills] div' },
    ],
  },
  initialize: function (spec) {
    var self = this;
    if(this.model) {
      return;
    }

    // app.users.getOrFetch(spec.id, function (err, model) {
    //   if (err) {
    //     log.error('couldnt find a user with id: ' + spec.id);
    //   }
    //   self.model = model;
    //   log('Got user', model.name);
    // });
  },
});