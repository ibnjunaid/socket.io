
interface Device{
    name : string;
    ID : string,
    owner : string,
    macAddress : string,
    requestTimeStamp : Date
}

interface connectedClient{
    socket : {},
}

interface tellRequest{
    senderID : string,    // supports 'all' to send msg to all connected clients
    receiverID : string,
    message : string,
}

interface killRequest{
    victim : string, // supports 'all' to kill all connected clients
    killer : string
}

interface registrationAcknowledgement{
    isRegistrationSucess: boolean,
    wasAlreadyRegistered : boolean,
    socketID ?: string,
}

interface killAcknowledgement{
    wasKillSuccess : boolean,
    killedDeviceID : string, //supports all if all devices re killed
}

interface getDevicesResponse{
    name : string;
    id : string;
}

//Server interfaces

interface killSwitchRequest{
    victimID : string,
    killerID : string 
}

interface msgRequest{
    msg : string,
    senderID : string,
    receiverID : string
}



/*
    * Events clients are permitted to emit
        1. kill : takes  object of interface killrequest
                  returns killAcknowledgement event Object 

        2. getDevices : takes no parameter 
                        returns getDevicesResponse Object 
        
        3. tell : takes object of interface tellRequest 
                  returns object of tellAcknowledgement interface
    

    * Events Server will emit to the clients
        1. killSwitch : takes object of interface killSwitchRequest

        2. 

*/

