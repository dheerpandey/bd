"use strict";
exports.__esModule = true;
var http_1 = require("http");
var create_app_1 = require("./create-app");
var port = 8081;
var app = create_app_1.createApp();
var server = http_1.createServer(app);
server.listen(port, function () { return console.log('Generator Manager Listening on port ' + port); });
process.on('SIGINT', function () {
    console.log('SIGINT received ...');
    console.log('Shutting down the server');
    server.close(function () {
        console.log('Server has been shutdown');
        console.log('Exiting process ...');
        process.exit(0);
    });
});
