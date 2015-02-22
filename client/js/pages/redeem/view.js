/*global app, alert*/
var log = require('bows')('redeem');
var PageView = require('client/js/pages/base');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var ViewSwitcher = require('ampersand-view-switcher');
var Achievement = require('client/js/models/achievement');
var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');

module.exports = PageView.extend({
  pageTitle: 'Achievement Redeem',
  template: templates.pages.redeem.view,
  props: {
    notFound : 'boolean',
    survey: 'boolean',
    achievementObject: 'object'
  },
  children: {
    achievement: Achievement
  },
  initialize: function(spec) {
    var self = this;

    xhr({
      uri: config.cannonUrl + '/redeem/' + spec.id,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + app.me.token },
    }, function (err, resp, body) {
      if(err) {
        log(err);
      }

      if(resp.statusCode >= 400) {
        log(resp.statusCode);

        if(resp.statusCode == 404) {
          self.notFound = true;
        }
        else if (resp.statusCode == 412) {
          self.survey = true;
        }
      }

      var data = JSON.parse(body);

      if (data.success) {
        self.achievementObject = data.achievement;
      }

      self.render();

    });
  },
  render: function () {
    this.renderWithTemplate();

    this.achievement.model = this.achievementObject

    this.viewContainer = this.queryByHook('view-container');
    this.switcher = new ViewSwitcher(this.viewContainer);

    if(this.notFound) {
      this.handleNotFound();
    }
    else if (this.survey) {
      this.handleSurvey();
    }
    else if(this.achievement) {
      this.handleAchievement();
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