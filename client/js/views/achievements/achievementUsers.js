/*global app*/
var log = require('bows')('achievement-users');
var Achievements = require('client/js/models/achievements');
var AchievementsArea = require('client/js/views/achievements/area');
var config = require('client/js/helpers/clientconfig');
var templates = require('client/js/templates');
var AchievementsView = require('client/js/views/achievements/view');

var AchievementsGridView = AchievementsView.extend({
  template: templates.partials.achievements.gridView,
});

module.exports = AchievementsArea.extend({
  template: templates.partials.achievements.userArea,
  initialize: function() {
    var self = this;

    var AchievementUsers = Achievements.extend({
      url: config.cannonUrl + '/users/'+self.model.id+'/achievements',
    });

    self.model.achievements = new AchievementUsers();

    //self.fetchCollection();
  },
  render: function () {
    var self = this;

    self.renderWithTemplate();
    self.renderCollection(self.model.achievements, AchievementsGridView, self.queryByHook('achievements-list'));

    if (!self.model.achievements.length) {
      self.fetchCollection();
    }
  },
  fetchCollection: function () {
    var self = this;
    log('Fetching achievements');
    this.model.achievements.fetch({ success: function() {
      log('Got users achievements', self.model.achievements.serialize());
    }});
  }
});
