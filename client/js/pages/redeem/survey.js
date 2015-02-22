/*global app, alert*/
var log = require('bows')('redeem');
var PageView = require('client/js/pages/base');
var View = require('ampersand-view');
var templates = require('client/js/templates');
var ViewSwitcher = require('ampersand-view-switcher');
var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');

module.exports = PageView.extend({
  pageTitle: 'Survey',
  template: templates.pages.redeem.survey,
  props: {
    kind: 'string',
    schema: 'object',
    editor: 'object'
  },
  initialize: function(spec) {
    var self = this;

    xhr({
      uri: config.cannonUrl + '/surveys/' + self.kind,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + app.me.token },
    }, function (err, resp, body) {
      if(err) {
        log(err);
      }

      if(resp.statusCode >= 400) {
        return log(resp);
      }

      var data = JSON.parse(body);

      self.schema = data;

      self.render();
    });
  },
  render: function () {
    var self = this;
    this.renderWithTemplate();

    if(!self.schema) {
      return;
    }

    var options = {
      theme: 'bootstrap2',
      schema: self.schema,
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true
    };

    self.editor = new JSONEditor(self.queryByHook('form-container'), options);
  },
  events: {
    'click [data-hook~=action-sumbit]': 'handleSubmit',
  },
  handleSubmit: function () {
    var self = this;
    var value = self.editor.getValue();

    log('SUBMIT', value);
    return;
  },
});