/*global app*/
var log = require('bows')('achievement-users');
var Achievements = require('client/js/models/achievements');
var AchievementsArea = require('client/js/views/achievements/area');
var config = require('client/js/helpers/clientconfig');

module.exports = AchievementsArea.extend({
  initialize: function() {
    var self = this;

    var AchievementUsers = Achievements.extend({
      url: config.cannonUrl + '/users/'+self.model.id+'/achievements',
    });

    self.collection = new AchievementUsers();

    self.fetchCollection();
  }
});
