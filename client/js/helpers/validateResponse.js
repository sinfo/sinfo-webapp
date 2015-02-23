/*global app, alert*/
var log = require('bows')('response');
var auth = require('client/js/auth');

module.exports = function validateResponse(err, message, cb){
  cb || (cb = message) && (message = null);

  log(err);

	if(err){
		if(message){
			log.error(message, err.error);
		}
		if(err.statusCode == 401){
			auth.logout();
			app.navigate('/auth/login');
		}
		return cb(err);
	}
	cb();
};