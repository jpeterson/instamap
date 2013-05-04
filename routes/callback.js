/*
 * Accept GET/POST from IG.
 */

var request = require('request'),
	index = require('../routes/index');

var myUrl = '';

// CONSTANTS
var IG_URL_ARR = [
	'https://api.instagram.com/v1/geographies/',
	'/media/recent?client_id='],
	CLIENT_ID = '172d792897af4c8c8ec4d7ca2d6f4f8f';

/**
 * When we start a subscription, IG sends a challenge GET, respond neds to be the challenge param
 */
exports.get = function(req, res) {
	// Respond to IG's challenge
	res.send(req.query['hub.challenge']);
};

/**
 * When IG has new items for us, it POSTS to this page. We need to use the object_id associated with our
 * subscription to request the actual data, then parse it in index.js
 */
exports.post = function(req, res) {
	res.send(req.body);
	var geogId = req.body[0].object_id;

	// URL we built to fetch data
	myUrl = IG_URL_ARR[0] + geogId + IG_URL_ARR[1] + CLIENT_ID;
	console.log(myUrl);

	// Send request to IG
	request.get(
	myUrl,

	/**
	 * Handle IG response, all we are doing here is sending the response to index.updated as JSON
	 */
	function(error, response, body) {
		if (body) {
			index.updated(JSON.parse(body));
		}
	});
};