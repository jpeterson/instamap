/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	index = require('./routes/index'),
	callback = require('./routes/callback'),
	http = require('http'),
	path = require('path');

var app = express();

//CONSTANTS
var count = 0,
	app_items = {}; // contains a list of unique IG items

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/callback', callback.get);
app.post('/callback', callback.post);

server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// ***
// End Express Setup
// ***

//Start Socket.io
io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('welcome', {
		message: 'Greetings!'
	});

	var photos = setInterval(function() {
		if (app_items) {

			//we have media, iterate over them and emit them, then delete them from our store
			for (var i = 0; i < app_items.length; i++) {
				console.log(app_items[i]);
				// Send item
				socket.emit('media', {
					media: app_items[i]
				});
				// Remove item
				delete app_items[i];
			}
		}
	}, 2000);

	socket.on('disconnect', function() {
		//console.log('user disconnected');
	});
});

/**
 * This method is invoked when IG notifies that a new item has been added to our subscription
 * @param  {object} items An object containing all items that have been posted since our subscription started
 */
exports.updated = function(items) {
	var length = items.data.length,
		media = null;
	for (var i = 0; i < length; i++) {
		media = items.data[i];
		if (!app_items[media.id]) {
			// Add item to app_items
			app_items[media.id] = media;
			console.log('item added');
		} else {
			console.log('already exists');
		}
	}
};