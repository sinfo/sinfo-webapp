/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var templates = require('../templates');
var setFavicon = require('favicon-setter');
var Nav = require('./nav');
var Footer = require('./footer');
var $ = require('jquery');


module.exports = View.extend({
  template: templates.body,
  initialize: function () {
    // this marks the correct nav item selected
    this.listenTo(app.router, 'page', this.handleNewPage);
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
        document.title = _.result(newView, 'pageTitle') || 'Muzzley Web App';
        document.scrollTop = 0;

        // add a class specifying it's active
        dom.addClass(newView.el, 'active');

        // store an additional reference, just because
        app.currentPage = newView;
      }
    });

    // setting a favicon for fun (note, it's dynamic)
    setFavicon('/static/logo.png');
    return this;
  },
  subviews: {
    nav: {
      hook: 'nav',
      prepareView: function(el) {
        return new Nav({
          model: this.model,
          el: el
        });
      }
    },
   /* footer: {
      hook: 'footer',
      prepareView: function(el) {
        return new Footer({
          model: this.model,
          el: el
        });
      }
    }*/
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
    document.getElementById('menuVertical').style.display = 'none';
  },

});
