/*global app, alert*/
var log = require('bows')('users');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var UserForm = require('client/js/forms/user');
var _ = require('client/js/helpers/underscore');


module.exports = PageView.extend({
  pageTitle: 'Edit profile',
  template: templates.pages.users.edit,
  initialize: function (spec) {
    var self = this;
    app.me.on('sync', function() {
      log('sync')
      // self.renderWithTemplate();
    })

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

        log(this.model.serialize())

        return new UserForm({
          el: el,
          model: model,
          clean: function (data) {
            data = _.compactObject(data);
            return data;
          },
          submitCallback: function (data) {
            data = self.model.changedAttributes(data);
            model.save(data, {
              patch: true,
              wait: false,
              success: function (model, response, options) {
                if(model.id == app.me.id) {
                  return app.navigate('/me');
                }

                app.navigate('/users/'+model.id);
              },
              error: function (model, response, options) {
                console.log('error', response.statusCode, response.response);
              }
            });
          }
        });
      }
    }
  }
});