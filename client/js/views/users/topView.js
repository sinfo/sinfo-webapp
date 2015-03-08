var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.users.topView,
  bindings: {
    'model.name': { hook: 'name' },
    'model.points.total': { hook: 'points' },
    'model.img': { type: 'attribute', hook: 'img', name: 'src' },
    'model.viewUrl': { type: 'attribute', hook: 'action-view', name: 'href' }
  },
});
