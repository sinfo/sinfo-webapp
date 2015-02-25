/*global app, alert*/
var log = require('bows')('achievements');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var AchievementsView = require('client/js/views/achievements/view');

var AchievementsGridView = AchievementsView.extend({
  template: templates.partials.achievements.gridView,
});

module.exports = PageView.extend({
  pageTitle: 'Achievements',
  template: templates.partials.achievements.area,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, AchievementsGridView, this.queryByHook('achievements-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log(this.url);
    log('Fetching achievements');
    this.collection.fetch();
    return false;
  }
});
