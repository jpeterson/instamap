require(['../socket.io/socket.io'], function(io) {
	var socket = io.connect('http://localhost:3000');
	socket.on('connection', function(data) {
		console.log(data);
	});
});