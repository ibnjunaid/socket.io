const io = require('socket.io-client');

(function(){
let socket = io.connect("http://localhost:3000");
//let socket = io.connect("https://cloudroute.appspot.com/");
 
    socket.emit("registration",{'deviceID':"XX2014-225",'deviceName':"Osama-bot","timeStamp":Date.now()},function(){
        console.log("sucess!!");
    });
    socket.on("registration_acknowledge",(data)=>{
        console.log(data.message);
    })

    socket.on('private_msg',(data)=>{
        console.log(data.from + 'said' + data.message);
    })

    // socket.emit('log',{id:"XX2014-225"});

    // socket.emit('getDevices');

    socket.emit('tell',{from:'Osama-bot',to:'Huzefa-bot',message:'Hello Huzefa from Sockets'});
    
    socket.emit('tell',{from:'Osama-bot',to:'Bushra-bot',message:'Hello Bushra from Sockets'});

}())
 