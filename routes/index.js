/*
 * GET home page.
 */

var request = require('request');

//CONSTANTS
var app_items = {}; // contains a list of unique IG items

/**
 * This method is invoked when index.html is loaded, serve a static file, then start a subscription with IG
 */
exports.index = function(req, res) {
	console.log('exports.index');
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
				callback_url: 'http://owlg.localtunnel.me/callback'
			}
		}, function(error, response, body) {
			console.log(body);
		});
	});
};

/**
 * This method is invoked when IG notifies that a new item has been added to our subscription
 * @param  {object} items An object containing all items that have been posted since our subscription started
 */
exports.updated = function(items) {
	io = require('socket.io').listen(server);

	io.on('connection', function(socket) {
		console.log('messsage has been emitted...!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		socket.broadcast.emit('greeting', 'hello browser :)');

		var length = items.data.length,
			media = null;
		for (var i = 0; i < length; i++) {
			media = items.data[i];
			if (!app_items[media.id]) {

				// Add item to app_items
				app_items[media.id] = media;

				/*			
				 * Here I want to send new item to the client... Not sure how
				 */



				/*			io.connect('http://localhost:8081').emit('newItem', {
					item: media
				});*/

			} else {
				console.log('already exists');
			}
		}
	});
};