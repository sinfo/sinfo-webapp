/*global app, alert*/
var log = require('bows')('top-users');
var Users = require('client/js/models/users');
var PageView = require('client/js/pages/base');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;
var UserView = require('client/js/views/users/view');
var templates = require('client/js/templates');
var TopUsers = Users.extend({
  url: cannonUrl + '/users?sort=-points.total&limit=10'
});

module.exports = PageView.extend({
  pageTitle: 'Top Users',
  template: templates.partials.users.area,
  initialize: function() {
    var self = this;

    self.collection = new TopUsers();
  },
  render: function () {
    var self = this;

    self.renderWithTemplate();
    self.renderCollection(self.collection, UserView, self.queryByHook('users-list'));

    if (!self.collection.length) {
      self.fetchCollection();
    }
  },
  fetchCollection: function () {
    var self = this;
    log('Fetching top users');
    self.collection.fetch({ success: function() {
      log('Got top users', self.collection.serialize());
      self.render();
    }});
  }
});