/*global app, alert*/
var log = require('bows')('users');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var UserForm = require('client/js/forms/user');
var _ = require('client/js/helpers/underscore');
var fileRequests = require('client/js/helpers/fileRequests');
var validateResponse = require('client/js/helpers/validateResponse');


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
            var cleanData = {
              id: data.id,
              name: data.name,
              img: data.img,
              mail: data.mail,
              area: data.area,
              skills: data.skills,
              job: {
                startup: data['job-startup'],
                internship: data['job-internship'],
              },
              file: data.file
            };

            if(data['job-start'] && data['job-start'] != '') {
              cleanData.job.start = data['job-start'];
            }

            return _.compactObject(cleanData);
          },
          submitCallback: function (data) {

            if(data.file){
              fileRequests.upload(model.token, data.file[0], function(err, resp, body){
                if(err){
                  log.error(err, resp.statusCode);
                }
                var file = JSON.parse(body);
                app.file.set(file);
                alert("CV enviado com sucesso");
              });
              delete data.file;
            }


            var changedAttributes = self.model.changedAttributes(data) || {};
            changedAttributes.job = data.job;

            log('data', data);
            log('changedAttributes', changedAttributes);

            if(changedAttributes.job.start === null)
              changedAttributes.job.start = 0;

            model.save(changedAttributes, {
              patch: true,
              wait: false,
              success: function (model, response, options) {
                if(model.id == app.me.id) {
                  return app.navigate('/me');
                }

                app.file.fetch();

                app.navigate('/users/'+model.id);
              },
              error: function (model, response, options) {
                validateResponse(response, function(err){
                  log.error(response.statusCode, response.response);
                });
              }
            });
          }
        });
      }
    },
  }
});