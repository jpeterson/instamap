var socket = io.connect('http://localhost');
socket.on('connection', function(data) {
	console.log(data);
});