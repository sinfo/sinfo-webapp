var log = require('bows')('achievements');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');

var SessionView = require('client/js/views/sessions/view');

module.exports = PageView.extend({
  pageTitle: 'View Achievement',
  template: templates.pages.achievements.view,
  bindings: {
    'model.name' : '[data-hook~=name]',
    'model.category': '[data-hook~=category]',
    'model.description': '[data-hook~=description]',
    'model.instructions': '[data-hook~=instructions]',
    'model.value': '[data-hook~=value]',
    'model.img': {
      type: 'attribute',
      hook: 'img',
      name: 'src'
    },
  },
  initialize: function (spec) {
    var self = this;
    app.achievements.getOrFetch(spec.id, {all: true}, function (err, model) {
      if (err) {
        return log.error('couldnt find a achievement with id: ' + spec.id);
      }
      self.model = model;
      
      app.sessions.getOrFetch(model.session, function(err, sessionModel) {
        if (err) {
          return log.error('couldnt find a achievement event with id: ' + model.session);
        }
        self.model.sessionDetails.model = sessionModel;  
                                
        log('Got achievement event', sessionModel.name);
      });
    });
  },
  subviews: {
    session: {
      container: '[data-hook=achievement-session] div',
      parent: this,
      waitFor: 'model.sessionDetails',
      prepareView: function (el) {
        var self = this;
        log("render da subview");
        return new SessionView({
          el: el,
          model: self.model.sessionDetails
        });
      }
    },
  }
});