/*global app, alert*/
var log = require('bows')('redeem');
var PageView = require('client/js/pages/base');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var ViewSwitcher = require('ampersand-view-switcher');
var Achievement = require('client/js/models/achievement');


module.exports = PageView.extend({
  pageTitle: 'Achievement Redeem',
  template: templates.pages.redeem.view,
  props: {
    notFound : 'boolean',
    survey: 'boolean'
  },
  initialize: function() {
    this.render() 
  },
  render: function () {
    this.renderWithTemplate();
    this.viewContainer = this.queryByHook('view-container');
    log(this.viewContainer);
    this.switcher = new ViewSwitcher(this.viewContainer);
    if(this.notFound) {
      this.handleNotFound();
    } 
    else if (this.survey) {
      this.handleSurvey();
    }
  },
  handleNotFound: function () {
    var view = new NotFound({ parent: this });
    this.switcher.set(view);
    return;
  },
  handleSurvey: function () {
    return; 
  },
  handleAchievement: function () {
    return;
  }
})

var NotFound = View.extend({
  template: templates.partials.redeem.notFound
});