define([
    'app/map',
    'app/socket',
    'alertify',
    'esri/geometry/Extent',
    'dojo/topic',
    'dojo/domReady!'],

function(map, socket, alertify, Extent, topic) {
    var initialize = function() {

        /**************************************
         *
         * Generic socket listeners
         *
         **************************************
         */

        var messageNode = document.getElementById('message');

        socket.on('timer', function(data) {
            messageNode.innerHTML = 'Last socket received @ ' + data.date;
        });

    };

    return {
        initialize: initialize
    };
});