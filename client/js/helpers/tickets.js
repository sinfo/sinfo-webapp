var xhr = require('xhr');
var config = require('client/js/helpers/clientconfig');
var log = require('bows')('tickets');

var tickets = {};

function _updateSession (ticket) {
  if(!ticket) {
    return;
  }
  var model = app.sessions.get(ticket.session);
  model.users = ticket.users;

  var userId = app.me.id;
  model.isRegistered = ticket.users && ticket.users.indexOf(userId) != -1;
  model.isWaiting = ticket.waiting && ticket.waiting.indexOf(userId) != -1;
  model.isConfirmed = ticket.confirmed && ticket.confirmed.indexOf(userId) != -1;
  model.isPresent = ticket.present && ticket.present.indexOf(userId) != -1;
}


tickets.registerTicket = function(sessionId, cb) {
  var userId = app.me.id;

  xhr({
    uri: config.cannonUrl +'/tickets/'+sessionId,
    headers: {
      'Authorization': 'Bearer ' + app.me.token
    },
    method: 'POST'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = JSON.parse(body);
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    _updateSession(data);

    cb(null, data);
  });
};


tickets.confirmTicket = function(sessionId, cb) {
  var userId = app.me.id;

  xhr({
    uri: config.cannonUrl +'/tickets/'+sessionId,
    headers: {
      'Authorization': 'Bearer ' + app.me.token
    },
    method: 'PUT'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = JSON.parse(body);
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    _updateSession(data);

    cb(null, data);
  });
};


tickets.voidTicket = function(sessionId, cb) {
  var userId = app.me.id;

  xhr({
    uri: config.cannonUrl +'/tickets/'+sessionId,
    headers: {
      'Authorization': 'Bearer ' + app.me.token
    },
    method: 'DELETE'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = JSON.parse(body);
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    _updateSession(data);

    cb(null, data);
  });
};


tickets.getTicket = function(sessionId, cb) {
  var userId = app.me.id;

  xhr({
    uri: config.cannonUrl +'/tickets/'+sessionId,
    headers: {
      'Authorization': 'Bearer ' + app.me.token
    },
    method: 'GET'
  }, function (err, resp, body) {
    if(err) {
      return cb(err);
    }

    var data = JSON.parse(body);
    if(resp.statusCode >= 400) {
      return cb(data);
    }

    _updateSession(data);

    cb(null, data);
  });
};


module.exports = tickets;

