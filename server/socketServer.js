const WebSocket = require('multiclient-websocket');
const Pharmacies = require('./models/PharmacyModel');
const ChatTemplates = require('./common/ChatTemplates');
const connectedPharmacies = require('./memory/pharmacies.memory.temp');
const connectedCustomers = require('./memory/customers.memory.temp');
const pharmaciesConnectionStatus = require('./memory/pharmacies.connection.status.temp');

const server = new WebSocket();

class PharmacyClient{
    constructor(id , client){
        /**
         * @type {WebSocket}
         */
        this.client = client;
        this.id = id;
        this.updateDb(true);
    }

    async updateDb(status){
        try{
            await Pharmacies.update({
                id: this.id , 
                alive: status,
            })
        }catch(e){
            console.log(e);
        }
    }
}

class CustomerClient{
    constructor(id , client){
        this.id = id;
        this.client = client;
    }
}

// const connectedPharmacies = {};
// const connectedCustomers = {};

/**
 * 
 * @param {PharmacyClient[]} pharmacies 
 */
function sendChatBoxRequest(pharmacies=[] , customerId){

    pharmacies.map(pClient=>{
        const reqString = ChatTemplates.requestPharmacyChatBox(customerId);
        pClient.client.send(reqString);
        console.log('send request to ' , pClient.id);
    })


}





// server.onClientConnect(()=>{
//     console.log('new client connected');

// })

server.onClientMessage((message , client)=>{
    try{

        console.log({message});
        if(ChatTemplates.isHealthCheck(message)){
            const id  = ChatTemplates.getIdFromHealthCheck(message);
            pharmaciesConnectionStatus[id] = Date.now();
            return;
        }


        // create connection with server
        if(ChatTemplates.isRequestConnection(message)){
            const stabObj = ChatTemplates.readStablishConn(message);

            if(stabObj.type == "pharmacy"){
                connectedPharmacies[`${stabObj.id}`] = new PharmacyClient(stabObj.id ,client)
                client.send(ChatTemplates.createConnection(true));
                
            }else if(stabObj.type == "customer"){
                connectedCustomers[`${stabObj.id}`] = new CustomerClient(stabObj.id , client);
                client.send(ChatTemplates.createConnection(true));
            }

            return;
        // request pharmacy
        }else if(ChatTemplates.isPharmacyRequest(message)){
            const reqObj = ChatTemplates.readPharmacyRequest(message);
            const pharmacy = connectedPharmacies[`${reqObj.pharmacyId}`];


            if(!pharmacy) return client.send(ChatTemplates.acceptClient(false , reqObj.customerId));

            sendChatBoxRequest([pharmacy] , reqObj.customerId);

            return;

        }else if(ChatTemplates.isAcceptClient(message)){
            const reqClientObj = ChatTemplates.readChatBoxAcceptRequestFromServer(message);

            if(reqClientObj.accept == true){
            
                const customer = connectedCustomers[`${reqClientObj.customerId}`];
                const pharmacy = connectedCustomers[`${reqClientObj.id}`];
                customer?.client.send(ChatTemplates.chatBoxAcceptRequestFromServerToClient(true , reqClientObj.id , reqClientObj.customerId));

            }else{
                 const customer = connectedCustomers[`${reqClientObj.customerId}`];
                const pharmacy = connectedCustomers[`${reqClientObj.id}`];
                customer?.client.send(ChatTemplates.chatBoxAcceptRequestFromServerToClient(false , reqClientObj.id , reqClientObj.customerId));

            }

            return;
        
        }else{
            const {opcode , data: msgObj} = ChatTemplates.decodeString(message);

            if(opcode == "ERROR"){ 
                client.send(ChatTemplates.minorError({
                    msg:"decode error : some thing wrong with last frame" ,
                    to:"customer",
                    from:"server",
                    toId : "-1",
                }))

                return;
            }
            if(!msgObj.toId || !msgObj.id || !msgObj.to) return; 

            if(msgObj.to == "pharmacy"){
                connectedPharmacies[`${msgObj.toId}`]?.client.send(message)
            }else if(msgObj.to == "customer"){
                connectedCustomers[`${msgObj.toId}`]?.client.send(message)
            }else{
                
            }

        }


    }catch(e){
        console.log(e);
        client.send(`STABLISH=${JSON.stringify({
                status:"error",
        })}`)

    }
})

setInterval(()=>{
    for(const [id , pharmacy] of Object.entries(connectedPharmacies)){
        pharmacy.client.send(ChatTemplates.healthCheck());
        if(!pharmaciesConnectionStatus[id]){
            pharmaciesConnectionStatus[id] = Date.now();
        }
    }
} , 3000)
 


setInterval(()=>{
    for(const [id , timestamp] of Object.entries(pharmaciesConnectionStatus)){
        if(Date.now() - timestamp > 10000){
            console.log(`ID ${id} : pharmacy disconnected`);
            delete connectedPharmacies[id];
            delete pharmaciesConnectionStatus[id];
        }
    }
} , 3000);


module.exports  = server;