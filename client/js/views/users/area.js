/*global app, alert*/
var log = require('bows')('users');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var UserView = require('client/js/views/users/view');

module.exports = PageView.extend({
  pageTitle: 'Users',
  template: templates.partials.users.area,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, UserView, this.queryByHook('users-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching users');
    this.collection.fetch();
    return false;
  }
});
