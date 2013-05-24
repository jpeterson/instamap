/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	callback = require('./routes/callback'),
	http = require('http'),
	path = require('path');

var app = express();

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
app.get('/users', user.list);

app.get('/callback', callback.get);
app.post('/callback', callback.post);

server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	var photos = setInterval(function() {
		socket.volatile.emit('instagram photo', {
			media: 'photo',
			tags: ['pic', 'admo', 'ramen']
		});

		// sendPhotos(function(tweet) {
		// 	socket.volatile.emit('bieber tweet', tweet);
		// });
	}, 100);

	socket.on('disconnect', function() {
		clearInterval(tweets);
	});
});

sendPhotos = function(photos) {
	console.log(photos);
	/*
	io = require('socket.io').listen(server);

	io.on('connection', function(socket) {
		socket.broadcast.emit('greeting', 'hello browser :)');
	});
*/
};