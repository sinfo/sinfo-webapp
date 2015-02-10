var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.sessions.view,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.kind': '[data-hook~=kind]',
    'model.startParsed': '[data-hook~=date]',
    'model.viewUrl': {
      type: 'attribute',
      hook: 'action-view',
      name: 'href'
    }
  }
});
