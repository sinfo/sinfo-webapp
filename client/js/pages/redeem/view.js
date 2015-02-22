/*global app, alert*/
var log = require('bows')('redeem');
var PageView = require('client/js/pages/base');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var ViewSwitcher = require('ampersand-view-switcher');
var Achievement = require('client/js/models/achievement');
var Session = require('client/js/models/session');
var SurveyView = require('./survey');
var AchievementView = require('client/js/views/achievements/view');
var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');

module.exports = PageView.extend({
  pageTitle: 'Achievement Redeem',
  template: templates.pages.redeem.view,
  props: {
    redeemCode: 'string',
    notFound : 'boolean',
    survey: 'boolean',
    achievementObject: 'object'
  },
  children: {
    achievement: Achievement,
    session: Session
  },
  initialize: function(spec) {
    var self = this;

    self.redeemCode = spec.id;

    xhr({
      uri: config.cannonUrl + '/redeem/' + spec.id,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + app.me.token },
    }, function (err, resp, body) {
      if(err) {
        log(err);
      }

      var data = body && JSON.parse(body);

      if(resp.statusCode >= 400) {
        log(resp.statusCode);

        if(resp.statusCode == 404) {
          self.notFound = true;
        }
        else if (resp.statusCode == 412) {
          self.survey = true;
          self.session = new Session(data.session);
        }
      }

      if (data.success) {
        self.achievement = new Achievement(data.achievement);
      }

      self.render();
    });
  },
  render: function () {
    this.renderWithTemplate();

    // this.achievement.model = this.achievementObject

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
    var view = new SurveyView({ kind: this.session.kind.toLowerCase(), redeemCode: this.redeemCode, parent: this });
    this.switcher.set(view);
    return;
  },
  handleAchievement: function () {
    var view = new AchievementView({ model: this.achievement, parent: this });
    this.switcher.set(view);
    return;
  }
})

var NotFound = View.extend({
  template: templates.partials.redeem.notFound
});