var pathRegex = new RegExp(/\/[^\/]+$/);
var locationPath = location.pathname.replace(pathRegex, '');
require({
    packages: [
		{name: 'app', location: locationPath + '/js/app'},
		{name: 'jquery', location: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1', main: 'jquery.min'},
		{name: 'socketio', location: '//dula.localtunnel.me/socket.io', main: 'socket.io'},
		{name: 'alertify', location: locationPath + 'lib/alertify', main: 'alertify'}
    ]},
    ['app/application', 'dojo/domReady!'],

function(App) {

	//DOM Manipulation

    App.initialize();
});