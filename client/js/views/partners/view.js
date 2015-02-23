var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.partners.view,
  bindings: {
    'model.img': { type: 'attribute', hook: 'img', name: 'src' },
    'model.name': { type: 'attribute', hook: 'action-view', name: 'title' },
    'model.viewUrl': { type: 'attribute', hook: 'action-view', name: 'href' }
  }
});
