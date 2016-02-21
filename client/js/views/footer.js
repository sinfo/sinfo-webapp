var View = require('ampersand-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var PartnersArea = require('client/js/views/partners/area');

module.exports = View.extend({
  template: templates.partials.footer,
  props: {
    seeMore: 'string'
  },
  initialize: function (object) {
    var self = this;

    self.seeMore = '/events/' + object.selectedEvent + '/partners';
    
    if(!this.collection.length) {
      return this.collection.fetch({
        success: function () {
          self.render();
        }
      });
    }
  },
  bindings: {
    'seeMore': { type: 'attribute', hook: 'partners-see-more', name: 'href' }
  },
  subviews: {
    max: {
      container: '[data-hook=max-partner]',
      waitFor: 'collection.length',
      prepareView: function (el) {
        var maxPartners = new SubCollection(app.partners, {
          filter: function (partner) {
            return partner.advertisementLvl == 'max';
          }
        });

        return new PartnersArea({
          el: el,
          collection: maxPartners
        });
      }
    },
    exclusive: {
      container: '[data-hook=exclusive-partner]',
      waitFor: 'collection.length',
      prepareView: function (el) {
        var exclusivePartners = new SubCollection(app.partners, {
          filter: function (partner) {
            return partner.advertisementLvl === 'exclusive';
          }
        });

        return new PartnersArea({
          el: el,
          collection: exclusivePartners
        });
      }
    },
  },

});
