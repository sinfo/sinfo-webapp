/*global app*/
var AmpState = require('ampersand-state');
var AmpModel = require('ampersand-model');
var AmpCollection = require('ampersand-collection');
var options = require('options');
var marked = require('client/js/helpers/marked');
var SpeakerDetails = require('./speaker');
var PartnerDetails = require('./partner');
var UserDetails = require('./user');
var moment = require('moment');
var log = require('bows')('session');

var _ = require('client/js/helpers/underscore');

var Speaker = AmpState.extend({
  props: {
    id: ['string'],
    name: ['string'],
    position: ['string']
  }
});

var Tickets = AmpState.extend({
  props: {
    needed: ['boolean'],
    start: ['date'],
    end: ['date'],
    max: ['number']
  },
});

var SpeakerCollection = AmpCollection.extend({
  model: Speaker
});

var SpeakersDetailsCollection = AmpCollection.extend({
  model: SpeakerDetails
});

var PartnersDetailsCollection = AmpCollection.extend({
  model: PartnerDetails
});

var UsersDetailsCollection = AmpCollection.extend({
  model: UserDetails
});

module.exports = AmpModel.extend({
  props: {
    id: ['string'],
    name: ['string'],
    kind: ['string'],
    img: ['string'],
    place: ['string'],
    description: ['string'],
    date: ['date'],
    duration: ['date'],
    updated: ['date'],
    companies: ['array'],
  },
  children:{
    tickets: Tickets
  },
  collections: {
    speakers: SpeakerCollection,
    speakersDetails: SpeakersDetailsCollection,
    partnersDetails: PartnersDetailsCollection,
    usersDetails: UsersDetailsCollection,
  },
  session: {
    users: 'array',
    isRegistered: 'boolean',
    isWaiting: 'boolean',
    isConfirmed: 'boolean',
    isPresent: 'boolean',
  },
  derived: {
    thread: {
      deps: ['id'],
      fn: function () {
        return 'session-' + this.id;
      }
    },
    viewUrl: {
      deps: ['id'],
      fn: function () {
        return '/sessions/' + this.id;
      }
    },
    title: {
      deps: ['name'],
      fn: function () {
        return this.name;
      }
    },
    start: {
      deps: ['date'],
      fn: function () {
        return new Date(this.date);
      }
    },
    startParsed: {
      deps: ['date'],
      fn: function() {
        var date = new Date(this.date);
        return moment(date).format('MMMM Do YYYY, HH:mm');
      }
    },
    startDayStr: {
      deps: ['date'],
      fn: function() {
        var date = new Date(this.date);
        return moment(date).format('dddd, MMMM Do YYYY');
      }
    },
    startHoursStr: {
      deps: ['date'],
      fn: function() {
        var date = new Date(this.date);
        return moment(date).format('HH[h]mm');
      }
    },
    end: {
      deps: ['date', 'duration'],
      fn: function () {
        return new Date(this.date.getTime() + this.duration.getTime());
      }
    },
    endParsed: {
      deps: ['end'],
      fn: function() {
        var date = new Date(this.end);
        return moment(date).format('MMMM Do YYYY, HH:mm');
      }
    },
    background: {
      deps: ['img'],
      fn: function () {
        return 'background-image:url(' + this.img + ');';
      }
    },
    descriptionHtml: {
      deps: ['description'],
      fn: function () {
        return this.description && marked(this.description) || '';
      },
    },
    hasSpeakers: {
      deps: ['speakers'],
      fn: function () {
        return this.speakers.serialize() && this.speakers.serialize().length > 0;
      },
    },
    hasCompanies: {
      deps: ['companies'],
      fn: function () {
        return this.companies && this.companies.length > 0;
      },
    },
    hasUsers: {
      deps: ['users'],
      fn: function () {
        return this.users && this.users.length > 0;
      },
    },
    needsTicket: {
      deps: ['kind'],
      fn: function () {
        return this.tickets && this.tickets.needed;
      },
    },
    canRegist: {
      deps: ['isRegistered', 'isWaiting', 'needsTicket'],
      fn: function () {
        var now = new Date();
        return this.needsTicket && !this.isRegistered && !this.isWaiting && now > this.tickets.start && now < this.tickets.end && now < this.date;
      },
    },
    canConfirm: {
      deps: ['isRegistered', 'isConfirmed'],
      fn: function () {
        var now = new Date();
        return app.me.authenticated && this.isRegistered && !this.isConfirmed && moment(this.date).isSame(now, 'day') && now < this.date;
      },
    },
    canVoid: {
      deps: ['date', 'isRegistered'],
      fn: function () {
        var now = new Date();
        return app.me.authenticated && this.isRegistered;
      },
    },
    ticketsMessage: {
      deps: ['tickets', 'isWaiting', 'isConfirmed', 'isRegistered'],
      fn: function () {
        var now = new Date();

        if(!this.tickets.needed) {
          return 'Tickets are not needed for this session.';
        }

        if(now > new Date(this.date)) {
          return 'Event was on ' + moment(this.date).format('MMMM Do YYYY, HH:mm') + '.';
        }

        if(this.isConfirmed) {
          return 'You are confirmed for this session.';
        }

        if(this.isWaiting) {
          return 'You are on the waiting list for this session. We\'ll contact you if we can get a new ticket for you.';
        }

        if(this.isRegistered) {
          if(!moment(this.date).isSame(now, 'day')) {
            return 'You are registered for this session, come back on the day of the session to confirm the ticket.';
          }

          return 'You are registered for this session, please confirm the ticket bellow.';
        }

        if(now < new Date(this.tickets.start)) {
          return 'Ticket registration starts on ' + moment(this.tickets.start).format('MMMM Do YYYY, HH:mm') + '.';
        }
        if(now > new Date(this.tickets.end)) {
          return 'Ticket registration ended on ' + moment(this.tickets.end).format('MMMM Do YYYY, HH:mm') + '.';
        }

        // if(!this.users.length > this.tickets.max) {
        //   return 'Sold out.';
        // }

        return '';
      }
    },

  },
  parse: function (attrs) {
    attrs.date = new Date(attrs.date);
    attrs.duration = new Date(attrs.duration);
    attrs.updated = new Date(attrs.updated);

    if(attrs.tickets && attrs.tickets.start){
      attrs.tickets.start = new Date(attrs.tickets.start);
    }
    if(attrs.tickets && attrs.tickets.end){
      attrs.tickets.end = new Date(attrs.tickets.end);
    }

    return attrs;
  },
  serialize: function () {
    var res = this.getAttributes({props: true}, true);
    _.each(this._children, function (value, key) {
        res[key] = this[key].serialize && this[key].serialize() || this[key];
    }, this);
    _.each(this._collections, function (value, key) {
        res[key] = this[key].serialize && this[key].serialize() || this[key];
    }, this);

    delete res.speakersDetails;
    delete res.partnersDetails;
    delete res.usersDetails;

    return res;
  }
});