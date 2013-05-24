/*
 * GET home page.
 */

var request = require('request'),
	app = require('../app');

/**
 * This method is invoked when index.html is loaded, serve a static file, then start a subscription with IG
 */
exports.index = function(req, res) {

	// console.log('exports.index');
	res.render('index', {
		title: 'Express'
	});

	// First delete an existing subscriptions...
	request.del(
		'https://api.instagram.com/v1/subscriptions?client_secret=3be6dc18522f4214a2e345476d0de3e7&object=all&client_id=172d792897af4c8c8ec4d7ca2d6f4f8f',

	function(error, response, body) {
		// POST to IG asking for subscription
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
				callback_url: 'http://umhx.localtunnel.me/callback'
			}
		}, function(error, response, body) {
			// console.log(body);
		});
	});
};
