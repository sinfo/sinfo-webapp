var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
  pageTitle: 'Page not found!',
  template: templates.pages.notFound,
});
