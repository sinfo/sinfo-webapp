var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.members.view,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.background': {
      type: 'attribute',
      hook: 'img',
      name: 'style'
    },
    'model.twitterUrl': {
      type: 'attribute',
      hook: 'twitter',
      name: 'href'
    },
    'model.githubUrl': {
      type: 'attribute',
      hook: 'github',
      name: 'href'
    },
    'model.github': {
      type: 'toggle',
      hook: 'github'
    },
    'model.twitter': {
      type: 'toggle',
      hook: 'twitter'
    },
    'model.mailTo': {
      type: 'attribute',
      hook: 'mail',
      name: 'href'
    }
  }
});
