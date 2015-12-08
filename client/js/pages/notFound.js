var PageView = require('./base');
var templates = require('client/js/templates');


module.exports = PageView.extend({
  pageTitle: 'Page not found!',
  template: templates.pages.notFound,
});
