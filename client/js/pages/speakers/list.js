/*global app, alert*/
var log = require('bows')('speakers');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakerView = require('client/js/views/speaker');
var Speaker = require('client/js/models/speaker');
var AmpersandCollection = require('ampersand-collection');
var _ = require('client/js/helpers/underscore');
var $ = require('client/js/helpers/jquery');


module.exports = PageView.extend({
  pageTitle: 'Speakers',
  template: templates.pages.speakers.list,
  render: function () {
    
    this.renderWithTemplate();
    this.renderCollection(this.collection, SpeakerView, this.queryByHook('speakers-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching speakers');
    this.collection.fetch();

    return false;
  }
});
