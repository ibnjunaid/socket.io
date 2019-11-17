import '../Interfaces';
import './misc';
import './handlers';

export let connectedClients = {};
const express = require('express');
// import fs from 'fs';
import { printServerDetails } from './misc';
import { registrationHandler, killSwitchForwarder ,msgForwarder} from './handlers';

const app = express();
const server = app.listen(process.env.PORT || 3000,printServerDetails);
const io = require('socket.io')(server);

//After connection is established

io.on('connection',(socket)=>{
    console.log("New Device connected");

    //handling registration event
    socket.on("registration",(device:Device)=>{
        registrationHandler(socket,device,connectedClients);
    });

    socket.on('kill',(request:killSwitchRequest)=>{
        killSwitchForwarder(connectedClients,request);
    })

    socket.on('tell',(request :tellRequest)=>{
        msgForwarder(connectedClients,request);
    })
})