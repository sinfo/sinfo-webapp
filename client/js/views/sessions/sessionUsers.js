/*global app*/
var log = require('bows')('session-users');
var Users = require('client/js/models/users');
var UserView = require('client/js/views/users/view');
var UsersArea = require('client/js/views/users/area');
var config = require('client/js/helpers/clientconfig');

module.exports = UsersArea.extend({
  initialize: function() {
    var self = this;

    var SessionUsers = Users.extend({
      url: config.cannonUrl + '/tickets/'+self.model.id+'/users',
    });

    self.model.usersDetails = new SessionUsers();

    self.model.on('change:users', function() {
      self.fetchCollection();
    });

    self.fetchCollection();
  },
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.model.usersDetails, UserView, this.queryByHook('users-list'));
  },
  fetchCollection: function () {
    var self = this;
    self.model.usersDetails.fetch({ success: function() {
      log('Got session users', self.model.usersDetails.serialize());
      self.render();
    }});
  }
});
