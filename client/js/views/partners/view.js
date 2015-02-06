var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.partners.view,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.title': '[data-hook~=title]',
    'model.img': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
    'model.viewUrl': {
      type: 'attribute',
      hook: 'action-view',
      name: 'href'
    }
  }
});
