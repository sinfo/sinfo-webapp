/*global app, alert*/
var log = require('bows')('companies');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var CompanyView = require('client/js/views/company');
var AmpersandCollection = require('ampersand-collection');
var _ = require('client/js/helpers/underscore');
var $ = require('client/js/helpers/jquery');


module.exports = PageView.extend({
  pageTitle: 'Companies',
  template: templates.pages.companies.list,
  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.collection, CompanyView, this.queryByHook('companies-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching companies');
    this.collection.fetch();

    return false;
  }
});
