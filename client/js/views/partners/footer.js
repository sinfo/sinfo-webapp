/*global app, alert*/
var log = require('bows')('partners');
var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var PartnerView = require('client/js/views/partners/view');

module.exports = PageView.extend({
  pageTitle: 'Partners',
  template: templates.partials.partners.area,
  render: function () {
    this.renderWithTemplate();
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection: function () {
    log('Fetching partners');
    this.collection.fetch();
    return false;
  }
  subviews: {
    max: {
      container: '[data-hook=max-partner]',
      waitFor: 'model',
      prepareView: function (el) {
        var aux collection.filter(function(partner){
          return partner.participation && partner.participation.advertisementLvl == 'max';
        }

        aux = new AmpersandCollection(aux, {model: Partner});

        return new ParticipationsView({
          el: el,
          collection: aux
        });
      }
    },
    exclusive: {
      container: '[data-hook=exclusive-partner]',
      waitFor: 'model',
      prepareView: function (el) {
        var aux collection.filter(function(partner){
          return partner.participation && partner.participation.advertisementLvl == 'max';
        }

        aux = new AmpersandCollection(aux, {model: Partner});

        return new ParticipationsView({
          el: el,
          collection: aux
        });
      }
    },
  },
});