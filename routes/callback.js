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
	clientId = '172d792897af4c8c8ec4d7ca2d6f4f8f';


exports.get = function(req, res) {
	// Respond to IG's challenge
	res.send(req.query['hub.challenge']);
};

exports.post = function(req, res) {
	res.send(req.body);
	var geogId = req.body[0].object_id;

	console.log(IG_URL_ARR[0] + geogId + IG_URL_ARR[1] + clientId);

	myUrl = IG_URL_ARR[0] + geogId + IG_URL_ARR[1] + clientId;

	request.get(
	myUrl,

	function(error, response, body) {
		if (body) {
			index.updated(JSON.parse(body));
		}
	});


};