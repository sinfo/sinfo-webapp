/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var templates = require('client/js/templates');
var Nav = require('./nav');
var Footer = require('./footer');
var $ = require('jquery');

// HACK
var DEFAULT_EVENT = '24-sinfo'


module.exports = View.extend({
  template: templates.body,
  initialize: function () {
    var route =  window.location.pathname.split('/')
    this.selectedEvent = (route[1] === 'events' && route[2]) ? route[2] : DEFAULT_EVENT
    console.log(this.selectedEvent)

    // this marks the correct nav item selected
    this.listenTo(app.router, 'page', this.handleNewPage);

    window.addEventListener('load', function() {
      // Horrible hack
      //var nav_hours = new Date().getHours();
      //if (nav_hours >= 13 && nav_hours <= 19){
        //$('.live').attr('style', 'display: block !important');
      //}

      // Load mobile drawer menu
      Ink.requireModules(['Ink.UI.Drawer_1'], function (Drawer) {
        new Drawer()
      })
    })
  },
  events: {
    'click a[href]': 'handleLinkClick',
    'click [data-hook=menu-mobile]': 'toggleMenu',
    'click [data-hook=page-container]': 'hideMenu'
  },
  render: function () {
    // some additional stuff we want to add to the document head
    document.head.appendChild(domify(templates.head()));

    // main renderer
    this.renderWithTemplate({me: app.me});

    // init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
      show: function (newView, oldView) {
        // it's inserted and rendered for me
        document.title = _.result(newView, 'pageTitle') || 'SINFO';
        document.scrollTop = 0;

        // add a class specifying it's active
        dom.addClass(newView.el, 'active');

        // store an additional reference, just because
        app.currentPage = newView;
      }
    });
  },
  subviews: {
    nav: {
      hook: 'nav',
      prepareView: function(el) {
        return new Nav({
          selectedEvent: this.selectedEvent,
          model: this.model,
          el: el
        });
      }
    },
    footer: {
      hook: 'footer',
      prepareView: function(el) {
        app.partners.fetch({data: {event: this.selectedEvent}})
        return new Footer({
          collection: app.partners,
          el: el,
          selectedEvent: this.selectedEvent
        });
      }
    }
  },

  handleNewPage: function (view) {
    // tell the view switcher to render the new one
    this.pageSwitcher.set(view);

    // mark the correct nav item selected
    this.updateActiveNav();
  },

  handleLinkClick: function (e) {
    function getATag(el) {
      return el.nodeName == 'A' && el || el.parentNode && getATag(el.parentNode) || {};
    }

    var aTag = getATag(e.target);
    var local = aTag.host === window.location.host;

    // if it's a plain click (no modifier keys)
    // and it's a local url, navigate internally
    if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && aTag.target != '_blank') {
      e.preventDefault();
      app.navigate(aTag.pathname);
    }
  },

  updateActiveNav: function () {
    var path = window.location.pathname.slice(1);

    this.queryAll('.nav a[href]').forEach(function (aTag) {
      var aPath = aTag.pathname.slice(1);

      if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
        dom.addClass(aTag.parentNode, 'active');
      } else {
        dom.removeClass(aTag.parentNode, 'active');
      }
    });
  },

  toggleMenu: function() {
    var el = document.getElementById('menuVertical');

    el.style.display = (el.style.display != 'block' ? 'block' : 'none' );
  },

  hideMenu: function() {
    var el = document.getElementById('menuVertical');
    if (el) {
      el.style.display = 'none';
    }
  },

});
