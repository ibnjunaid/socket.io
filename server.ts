const express = require("express");
//import path from "path";
const fs = require("fs");

const app = express();
const server = app.listen(process.env.PORT||3000,()=>{
    console.log("Server listening");
});
let connectedClients = new Object();

const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log("A new device Connected");

    socket.on("initialisation",(data)=>{
        socket.deviceID = data.deviceID;
        socket.deviceName = data.deviceName;
        console.log(`A new Device Registered with ID :$`,data.deviceID,',\nName:',data.deviceName);
        // fs.writeFileSync('object.txt',JSON.stringify(data),(err)=>{
        //     if (err)
        //         throw err;
        //     console.log("saved");
        // })
        let sucessMsg ={
            'type':'sys_msg',
            'message':'the device'+ data.deviceID +'is sucessfully registered'
        };

        io.emit('registration_sucess',sucessMsg);
    });

    socket.on('killEvent',(data)=>{
        console.log(data.killDeviceID);
        io.emit('GKY',{deviceID:data.killDeviceID},function(response){
            console.log(response);
        })
    })
})