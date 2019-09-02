var express = require("express");
//import path from "path";
var fs = require("fs");
var app = express();
var server = app.listen(process.env.PORT || 3000, function () {
    console.log("Server listening");
});
var connectedClients = new Object();
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log("A new device Connected");
    socket.on("initialisation", function (data) {
        socket.deviceID = data.deviceID;
        socket.deviceName = data.deviceName;
        console.log("A new Device Registered with ID :$", data.deviceID, ',\nName:', data.deviceName);
        fs.writeFile('object.txt', data.toString(), function (err) {
            if (err)
                throw err;
            console.log("saved");
        });
    });
    socket.on('killEvent', function (data) {
        console.log(data.killDeviceID);
        io.emit('GKY', { deviceID: data.killDeviceID }, function (response) {
            console.log(response);
        });
    });
});
