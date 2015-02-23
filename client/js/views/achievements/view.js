var View = require('ampersand-view');
var templates = require('client/js/templates');
var log = require('bows')('achievement');

module.exports = View.extend({
  template: templates.partials.achievements.view,
  bindings: {
    'model.name' : { type: 'attribute', hook: 'action-view', name: 'title' },
    'model.category': '[data-hook~=category]',
    'model.description': '[data-hook~=description]',
    'model.instructions': '[data-hook~=instructions]',
    'model.value': '[data-hook~=value]',
    'model.img': { type: 'attribute', hook: 'img', name: 'src' },
    'model.viewUrl': { type: 'attribute', hook: 'action-view', name: 'href' }
  },
});
