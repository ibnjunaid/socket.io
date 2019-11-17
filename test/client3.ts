const io = require('socket.io-client');

import './../Interfaces'
import { logger } from '../Server/misc';

(function(){
let socket = io.connect("http://localhost:3000");
//let socket = io.connect("https://cloudroute.appspot.com/");
    
    let deviceDetails : Device = {
        name : "osama-bot",
        ID : "XX0901-11",
        owner : "Osama",
        macAddress : "XXXXXXX-123",
        requestTimeStamp : Date.now()
    }

    socket.emit("registration",deviceDetails,function(){
        console.log("sucess!!");
    });
    socket.on("registrationAcknowledgement",(data)=>{
        console.log(data);
    })

    socket.on('private_msg',(data)=>{
        console.log(data.from + 'said' + data.message);
    })

    socket.on('killSwitch',(data)=>{
        logger(data.killer + ' killed ' + data.victim);
    })

    socket.on('sysMsg',(data)=>{
        console.log(data);
    })

    // socket.emit('kill',)

    // socket.emit('log',{id:"XX2014-225"});

    // socket.emit('getDevices');
}())
 