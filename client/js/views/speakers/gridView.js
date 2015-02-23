var View = require('./view');
var templates = require('client/js/templates');

module.exports = View.extend({
  template: templates.partials.speakers.gridView,
});
