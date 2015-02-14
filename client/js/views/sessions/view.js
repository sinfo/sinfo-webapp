var View = require('ampersand-view');
var templates = require('client/js/templates');


module.exports = View.extend({
  template: templates.partials.sessions.view,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.kind': '[data-hook~=kind]',
    'model.viewUrl': {
      type: 'attribute',
      hook: 'action-view',
      name: 'href'
    },
    'model.place': [
      { type: 'toggle', hook: 'place' },
      { selector: '[data-hook~=place] span' },
    ],
    'model.startDayStr': [
      { type: 'toggle', hook: 'date' },
      { selector: '[data-hook~=date] span' },
    ],
    'model.startHoursStr': [
      { type: 'toggle', hook: 'hours' },
      { selector: '[data-hook~=hours] span' },
    ],
    'model.description': [
      { type: 'toggle', hook: 'description' },
      { selector: '[data-hook~=description] div' },
    ],
    'model.descriptionHtml': {
      type: 'innerHTML',
      hook: 'descriptionHtml'
    },
  }
});
