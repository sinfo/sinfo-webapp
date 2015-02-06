/*global app, alert*/
var log = require('bows')('partners');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var PartnerView = require('client/js/views/partners/view');

module.exports = PageView.extend({
  pageTitle: 'Partners',
  template: templates.partials.partners.area,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, PartnerView, this.queryByHook('partners-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching partners');
    this.collection.fetch();
    return false;
  }
});
