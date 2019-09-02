const io = require('socket.io-client');
(function(){
//let socket = io.connect("http://localhost:3000");
let socket = io.connect("https://cloudroute.appspot.com/");
 
    socket.emit("initialisation",{'deviceID':"XX2019-23",'deviceName':"Osama-bot"},function(){
        console.log("sucess!!");
    });
    socket.on("registration_sucess",(data)=>{
        console.log(data.message);
    })

}())
