/*global app*/
var log = require('bows')('session-partner-view');
var templates = require('client/js/templates');
var SubCollection = require('ampersand-subcollection');
var PartnerView = require('client/js/views/partners/view');
var PartnersArea = require('client/js/views/partners/area');


module.exports = PartnersArea.extend({
  initialize: function() {
    var self = this;
    if(app.partners.length) {
      return self.filterPartners();
    }

    app.partners.fetch({ success: function() {
      self.filterPartners();
    }});
  },
  filterPartners: function() {
    var self = this;

    log('Companies',self.model.companies);
    log('Partners',app.partners);

    if(!self.model.partnersDetails.length) {
      self.model.partnersDetails = new SubCollection(app.partners, {
        filter: function (partner) {
          console.log(partner.id);
          return self.model.companies.indexOf(partner.id) != -1;
        }
      });
    }
    log('Partners',self.model.partnersDetails);
    self.render();
  },
  render: function() {
    var self = this;
    this.renderWithTemplate();
    this.renderCollection(self.model.partnersDetails, PartnerView, this.queryByHook('session-partners-view'));
  }
});
