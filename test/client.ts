const io = require('socket.io-client');

import './../Interfaces'

(function(){
let socket = io.connect("http://localhost:3000");
//let socket = io.connect("https://cloudroute.appspot.com/");
    
    let deviceDetails : Device = {
        name : "Hritik-bot",
        ID : "XX0901-11",
        owner : "Hritik",
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

    socket.on('killSwitch',()=>{
        console.log()
    })
    let toKill : killSwitchRequest ={
        victim : "osama-bot",
        killer : "Hritik-bot"
    }
    socket.emit('kill',toKill);

    socket.on('sysMsg',(data)=>{
        console.log(data);
    })

    socket.on('msgEmit',(data)=>{
        console.log(data);
    })

    // socket.emit('log',{id:"XX2014-225"});

    // socket.emit('getDevices');

    socket.emit('tell',{senderName:'Hritik-bot',receiverName:'Huzefa-bot',message:'Hello Huzefa from Sockets'});
    
    socket.emit('tell',{senderName:'Hritik-bot',receiverName:'osama-bot',message:'Hello Bushra from Sockets'});

}())
 