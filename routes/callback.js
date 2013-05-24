/*
 * Accept GET/POST from IG.
 */

request = require('request');

exports.get = function(req, res) {
	console.log('exports.get');
	console.log(req.query['hub.challenge']);
	res.send(req.query['hub.challenge']);
};

exports.post = function(req, res) {
	console.log('exports.post');
	console.log(req.body);
	res.send(req.body);

	// Handle POST

};