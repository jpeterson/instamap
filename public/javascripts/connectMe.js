require(['http://localhost:3000/socket.io/socket.io.js'], function(io) {
	var socket = io.connect('http://localhost:3000');
	socket.on('media', function(data) {
		console.log(data);
	});
});