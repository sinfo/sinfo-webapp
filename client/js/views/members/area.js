/*global app, alert*/
var log = require('bows')('members');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var MemberView = require('client/js/views/members/view');

module.exports = PageView.extend({
  pageTitle: 'Members',
  template: templates.partials.members.area,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, MemberView, this.queryByHook('members-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching members');
    this.collection.fetch();
    return false;
  }
});
