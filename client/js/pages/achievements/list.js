/*global app, alert*/
var AchievementsArea = require('client/js/views/achievements/area');
var TopView = require('client/js/pages/users/top');

module.exports = AchievementsArea.extend({
  pageTitle: 'Achievements',
  subviews: {
  	top: {
      container: '[data-hook=top-users] div',
      parent: this,
      prepareView: function (el) {
        var self = this;
        return new TopView({
          el: el,
        });
      }
  	}
  }
});