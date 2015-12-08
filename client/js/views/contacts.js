var PageView = require('client/js/pages/base');
var templates = require('client/js/templates');
var $ = require('client/js/helpers/jquery');

module.exports = PageView.extend({
  template: templates.partials.contacts,
  initialize: function (spec) {
    var self = this;
    $.getScript( 'https://www.google.com/jsapi' , function(){
      google.load("maps", "3",{
        callback: function (){
          console.log('HERE LOADED GOOGLE');
          var map = new google.maps.Map(self.queryByHook('map-canvas'),{
            scrollwheel: false,
            center: new google.maps.LatLng(38.7379363,-9.1391744),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(38.7375721,-9.1376594),
            map: map,
            title: 'SINFO'
          });
          console.log(self.queryByHook('map-canvas'));
        }
      });
    });

  }
});
