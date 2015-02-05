/*global app, alert*/
var log = require('bows')('speakers');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SpeakersArea = require('client/js/views/speakers/area');


module.exports = SpeakersArea.extend({
  pageTitle: 'Speakers',
});
