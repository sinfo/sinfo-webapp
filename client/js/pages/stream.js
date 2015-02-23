var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
  pageTitle: 'Live Stream',
  template: templates.pages.stream,
});
