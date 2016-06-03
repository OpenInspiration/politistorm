define([ "jquery" ], function($) {

    const socket_address = 'http://localhost:3000/';

    console.log("[Tweeter] Connecting to " + socket_address + "...");

    io = io.connect(socket_address);

    io.on("connect", function() {
        console.log('[Tweeter] Opened.');
    });

    io.on("tweet", function(data) {
        console.log("[Tweeter] Tweet: ", event, JSON.stringify(data));
    });
    io.on("message", function(data) {
        console.log("[Tweeter] Message: ", event, JSON.stringify(data));
    });

    io.on("disconnect", function() {
        console.log("[Tweeter] Closed.");
    });


});