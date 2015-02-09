var xhr = require('xhr');
var cannonUrl = require('client/js/helpers/clientconfig').cannonUrl;

function upload(auth, data, cb){
	var formData = new FormData();
	formData.append('file', data);

	xhr({
		url: cannonUrl + '/files/me',
		method: 'POST',
		body: formData,
		headers: {
			Authorization: 'Bearer ' + auth,
		}
	}, cb);
}

module.exports.upload = upload;