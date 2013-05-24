/*
 * GET home page.
 */

request = require('request');

exports.index = function(req, res) {
	res.render('index', {
		title: 'Express'
	});
	console.log('exports.index');
	// POST to IG for subscription
	request.post(
		'https://api.instagram.com/v1/subscriptions/', {
		form: {
			client_id: '172d792897af4c8c8ec4d7ca2d6f4f8f',
			client_secret: '3be6dc18522f4214a2e345476d0de3e7',
			object: 'geography',
			aspect: 'media',
			lat: '38.8900',
			lng: '-77.0300',
			radius: '5000',
			callback_url: 'http://uglu.localtunnel.me/callback'
		}
	}, function(error, response, body) {
		console.log(body);
	});
};