/*global app, alert*/
var log = require('bows')('users');
var auth = require('client/js/auth');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');

module.exports = PageView.extend({
  pageTitle: 'View user',
  template: templates.pages.users.view,
  bindings: {
    'model.name': {
      hook: 'name'
    },
    'model.background': {
      type: 'attribute',
      hook: 'img',
      name: 'style'
    },
    'model.area': [
      { type: 'toggle', hook: 'area' },
      { selector: '[data-hook~=area] div' },
    ],
    'model.skills': { selector: '[data-hook~=skills] div' },
    'model.skills.length': { type: 'toggle', hook: 'skills' },
  },
  events: {
    'click [data-hook=facebook-add]': 'addFacebook',
    'click [data-hook=google-add]': 'addGoogle',
    'click [data-hook=fenix-add]': 'addFenix',
  },
  addFacebook: function () {
    var self = this;
    auth.login('facebook', true, function(){
      self.handleLogin.apply(self, arguments);
    });
  },
  addGoogle: function () {
    var self = this;
    auth.login('google', true, function(){
      self.handleLogin.apply(self, arguments);
    });
  },
  addFenix: function () {
    var self = this;
    auth.login('fenix', true, function(){
      self.handleLogin.apply(self, arguments);
    });
  },
  handleLogin: function(err, authDetails) {

    var elem = this.queryByHook('message-text');
    if(err) {
      elem.classList.add('error');
      if(err.statusCode == 409){
        elem.textContent = 'Account already associated to you';
      }
      else{
        elem.textContent = 'Error associating account';
      }
      log({err: err});
    }
    else{
      elem.classList.add('valid');
      elem.textContent = 'Account sucessfully added!';
    }
    app.fetchUserData();
  },
  initialize: function (spec) {
    var self = this;

    auth.init();

    if(this.model) {
      return;
    }

    // app.users.getOrFetch(spec.id, function (err, model) {
    //   if (err) {
    //     log.error('couldnt find a user with id: ' + spec.id);
    //   }
    //   self.model = model;
    //   log('Got user', model.name);
    // });
  },
});