var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.users.view,
  bindings: {
    'model.name': { type: 'attribute', hook: 'action-view', name: 'title' },
    'model.img': { type: 'attribute', hook: 'img', name: 'src' },
    'model.viewUrl': { type: 'attribute', hook: 'action-view', name: 'href' }
  },
});
