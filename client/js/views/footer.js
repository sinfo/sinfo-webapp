var View = require('ampersand-view');
var templates = require('client/js/templates');
var AmpersandCollection = require('ampersand-collection');
var Partner = require('client/js/models/partner');
var PartnerView = require('./partners/view');

module.exports = View.extend({
  template: templates.partials.footer,
  subviews: {
    max: {
      container: '[data-hook=max-partner]',
      waitFor: 'model',
      prepareView: function (el) {
        var aux = collection.filter(function(model){
          return model && model.advertisementLvl === 'max';
        });

        var aux = new AmpersandCollection(aux, {model: Partner});

        return new PartnerView({
          el: el,
          collection: aux
        });
      }
    },
    exclusive: {
      container: '[data-hook=exclusive-partner]',
      waitFor: 'model',
      prepareView: function (el) {
        var aux = collection.filter(function(model){
          return model && model.advertisementLvl === 'max';
        });

        aux = new AmpersandCollection(aux, {model: Partner});

        return new PartnerView({
          el: el,
          collection: aux
        });
      }
    },
  },

});
