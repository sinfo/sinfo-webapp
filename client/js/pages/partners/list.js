/*global app, alert*/
var PartnersArea = require('client/js/views/partners/area');
var log = require('bows')('login');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');

module.exports = PageView.extend({
  pageTitle: 'Partners',
  template: templates.pages.partners.list,
  initialize: function (options) {
    var self = this;
    if(!this.collection.length) {
      return this.collection.fetch({
        data: {event: options.event},
        success: function () {
          self.render();
        }
      });
    }
  },
  subviews: {
    min: {
      container: '[data-hook=min-partner]',
      waitFor: 'collection.length',
      prepareView: function (el) {
        var minPartners = new SubCollection(this.collection, {
          filter: function (partner) {
            return partner.advertisementLvl == 'min';
          }
        });

        return new PartnersArea({
          el: el,
          collection: minPartners
        });
      }
    },
    med: {
      container: '[data-hook=med-partner]',
      waitFor: 'collection.length',
      prepareView: function (el) {
        var medPartners = new SubCollection(this.collection, {
          filter: function (partner) {
            return partner.advertisementLvl == 'med';
          }
        });

        return new PartnersArea({
          el: el,
          collection: medPartners
        });
      }
    },
    max: {
      container: '[data-hook=max-partner]',
      waitFor: 'collection.length',
      prepareView: function (el) {
        var maxPartners = new SubCollection(this.collection, {
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
        var exclusivePartners = new SubCollection(this.collection, {
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
