var PageView = require('./base')
var templates = require('client/js/templates')
var SpeakersArea = require('client/js/views/speakers/gridArea')
var PartnersArea = require('client/js/views/partners/area')
var SessionsCalendar = require('client/js/views/sessions/calendar')
var log = require('bows')('home')

module.exports = PageView.extend({
  pageTitle: 'SINFO',
  template: templates.pages.home,
  bindings: {
    'model.name': { hook: 'event-name' },
    'model.dateStrings.range': { hook: 'date-range' },
    'model.dateStrings.year': { hook: 'date-year' }
  },
  initialize: function initHome (data) {
    this.selectedEvent = data.event
    this.model.fetch({
      error: function errorRedirect (err) {
        log('Error occured while fetching event', err)
        app.router.redirectTo('/404')
      }
    })
  },
  subviews: {
    speakers: {
      container: '[data-hook=speakers-area] div',
      prepareView: function (el) {
        app.speakers.fetch({data: {event: this.selectedEvent}})
        return new SpeakersArea({
          el: el,
          collection: app.speakers,
          event: this.selectedEvent
        })
      }
    },
    // partners: {
    //   container: '[data-hook=partners-area] div',
    //   prepareView: function (el) {
    //     app.partners.fetch({data: {event: this.selectedEvent}})
    //     return new PartnersArea({
    //       el: el,
    //       collection: app.partners,
    //       event: this.selectedEvent
    //     })
    //   }
    // },
    sessions: {
      container: '[data-hook=sessions-calendar] div',
      prepareView: function (el) {
        app.sessions.fetch({data: {event: this.selectedEvent}})
        return new SessionsCalendar({
          el: el,
          collection: app.sessions,
          model: this.model
        })
      }
    }
  }
})
