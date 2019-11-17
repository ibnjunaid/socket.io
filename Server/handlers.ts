import { logger } from './misc';
export  let registrationHandler = (socket:any,device : Device,connectedClients)=>{
    let wasAlreadyRegistered = false;
    if(connectedClients[device.name]){
        wasAlreadyRegistered = true;
    }
    connectedClients[device.name] = socket;
    connectedClients.device = {device};
    let socketID :string ;
    let isRegistrationSucess :boolean;
    if (socket.client.conn.id){
        socketID = socket.client.conn.id;
        isRegistrationSucess = true;
    }
    let acknowledgement : registrationAcknowledgement ={
        socketID :socketID,
        isRegistrationSucess : isRegistrationSucess,
        wasAlreadyRegistered : wasAlreadyRegistered
    }
    socket.emit('registrationAcknowledgement',acknowledgement);
}

export let killSwitchForwarder = (connectedClients,request:killSwitchRequest)=>{
   
    if(connectedClients[request.victim]){
        connectedClients[request.victim].emit('killSwitch',request);
    }
    else{
        connectedClients[request.killer].emit('sysMsg',"kill failed");
    }
}

export let msgForwarder = (connectedClients,request:tellRequest)=>{
    if(connectedClients[request.receiverName]){
         connectedClients[request.receiverName].emit('msgEmit',request);
    }
     else{ 
        connectedClients[request.senderName].emit('sysMsg',"Message Failed");
    }
}

