var View = require('ampersand-view');
var templates = require('client/js/templates');

module.exports = View.extend({
  autoRender: true,
  template: templates.partials.nav,
  bindings: {
    'model.name': '[data-hook~=user-name]',
    'model.background': {
      type: 'attribute',
      hook: 'user-picture',
      name: 'style'
    }
  }
});
