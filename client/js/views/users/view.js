var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.users.view,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.background': {
      type: 'attribute',
      hook: 'img',
      name: 'style'
    },
    'model.viewUrl': {
      type: 'attribute',
      hook: 'action-view',
      name: 'href'
    }
  }
});
