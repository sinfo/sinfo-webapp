var PageView = require('./base');
var templates = require('../templates');
var $ = require('client/js/helpers/jquery');

module.exports = PageView.extend({
  pageTitle: 'Contacts',
  template: templates.pages.contacts,
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
            position: new google.maps.LatLng(38.7373673,-9.1402185),
            map: map,
            title: 'SINFO 22!!!'
          });
          console.log(self.queryByHook('map-canvas'));
        }
      });
    });

  }
});
