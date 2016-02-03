var Boom = require('boom')

function handler (err, res, body, cb) {
  if (err) {
    return cb(Boom.badImplementation('Error handling request', err))
  }
  if (res.statusCode >= 400) {
    return cb(Boom.create(res.statusCode, 'Error response from request'))
  }
  cb(null, body)
}

module.exports = handler
