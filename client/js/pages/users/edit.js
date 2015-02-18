/*global app, alert*/
var log = require('bows')('users');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var UserForm = require('client/js/forms/user');
var _ = require('client/js/helpers/underscore');
var fileRequests = require('client/js/helpers/fileRequests');


module.exports = PageView.extend({
  pageTitle: 'Edit profile',
  template: templates.pages.users.edit,
  initialize: function (spec) {
    var self = this;

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
  events: {
    'click [data-hook=facebook-add]': 'addFacebook',
    'click [data-hook=google-add]': 'addGoogle',
    'click [data-hook=fenix-add]': 'addFenix',
  },
  addFacebook: function () {
    auth.login('facebook', this.handleLogin);
  },
  addGoogle: function () {
    auth.login('google', this.handleLogin);
  },
  addFenix: function () {
    auth.login('fenix', this.handleLogin);
  },

  subviews: {
    form: {
      container: 'form',
      waitFor: 'model.id',
      prepareView: function (el) {
        var self = this;
        var model = this.model;

        return new UserForm({
          el: el,
          model: model,
          clean: function (data) {
            data = {
              id: data.id,
              name: data.name,
              img: data.img,
              mail: data.mail,
              area: data.area,
              skills: data.skills,
              job: {
                startup: data['job-startup'],
                internship: data['job-internship'],
                start: data['job-start'],
              },
              file: data.file
            };
            return _.compactObject(data);
          },
          submitCallback: function (data) {

            if(data.file){
              fileRequests.upload(model.token, data.file[0], function(err, resp, body){
                if(err){
                  log.error(err, resp.statusCode);
                }
                var file = JSON.parse(body);
                app.file.set(file);
              });
              delete data.file;
            }


            var changedAttributes = self.model.changedAttributes(data) || {};
            changedAttributes.job = data.job;

            log('data', data);
            log('changedAttributes', changedAttributes);

            model.save(changedAttributes, {
              patch: true,
              wait: false,
              success: function (model, response, options) {
                if(model.id == app.me.id) {
                  return app.navigate('/me');
                }

                app.navigate('/users/'+model.id);
              },
              error: function (model, response, options) {
                log.error(response.statusCode, response.response);
              }
            });
          }
        });
      }
    },
  }
});