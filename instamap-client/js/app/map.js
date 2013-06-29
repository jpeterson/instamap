define([
	'esri/map',
	'dojo/domReady!'
], function(Map) {

	// Create mapNode and messageNode
	var mapNode = document.createElement('div');
	var messageNode = document.createElement('div');

	// Set attributes
	mapNode.setAttribute('id', 'map');
	messageNode.setAttribute('id', 'message');
	messageNode.className = 'message';
	messageNode.innerHTML = 'Loading...';

	// Append nodes and insert into DOM
	mapNode.appendChild(messageNode);
	document.body.appendChild(mapNode);

	var map = new Map("map", {
		basemap: "topo",
		center: [-122.45, 37.75], //long, lat
		zoom: 13,
		sliderStyle: "small"
	});

	return map;
});
