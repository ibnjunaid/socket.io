
const express = require("express");
//import path from "path";
const fs = require("fs");


const app = express();
const server = app.listen(process.env.PORT||3000,()=>{
    console.log("Server listening");
});
let connectedClients = {};

const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log("A new device Connected");

    socket.on("registration",(data)=>{
        connectedClients[data.deviceName] = socket;
        console.log(`A new Device Registered with ID :$`,data.deviceID,',\nName:',data.deviceName );
        fs.appendFileSync('object.txt',',\n'+JSON.stringify(data),(err)=>{
            if (err)
                throw err;
            console.log("saved");
        })
        let sucessMsg ={
            'type':'sys_msg',
            'message': 'New Registration',
            'socketID': socket.client.conn.id,
        };

        io.emit('registration_acknowledge',sucessMsg);
    });

    socket.on('kill',(data)=>{
       if (connectedClients.hasOwnProperty(data.deviceID)){
            if(data.deviceID.toLowerCase() == 'all'){
                io.emit('killSwitch');
            }
            else{
                connectedClients[data.deviceID].emit('killSwitch');
            }
        }
    });

    socket.on('tell',(data)=>{
        console.log(data.from);
        const to = data.to;
        const message = data.message;
        const from = data.from;
        if (connectedClients.hasOwnProperty(to)){
            connectedClients[to].emit('private_msg',{from:from,to:to,message:message});
        }
    })

    socket.on('getDevices',(data)=>{
        io.of('/').clients((error,clients)=>{
            if(error) throw error;
            console.log(clients);
        })
    })

    socket.on('log',({id})=>{
        //console.log(connectedClients[id]);
        fs.appendFileSync('clientObject.txt',',\n'+JSON.stringify(connectedClients),(err)=>{
            if (err)
                throw err;
        })
    })


})

// io.of('/admin').on('connect',(socket)=>{
//     console.log(socket.client.conn.id);
//     console.log(socket.id);
// })