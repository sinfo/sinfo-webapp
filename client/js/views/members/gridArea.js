/*global app, alert*/
var log = require('bows')('members');
var MemberArea = require('./area');
var templates = require('client/js/templates');
var MemberView = require('client/js/views/members/gridView');

module.exports = MemberArea.extend({
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, MemberView, this.queryByHook('members-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
});
