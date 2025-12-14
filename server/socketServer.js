const WebSocket = require('multiclient-websocket');
const Pharmacies = require('./models/PharmacyModel');
const ChatTemplates = require('./common/ChatTemplates');

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


const connectedPharmacies = {};
const connectedCustomers = {};

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

        console.log(message);
        // create connection with server
        if(ChatTemplates.isRequestConnection(message)){
            const stabObj = ChatTemplates.readStablishConn(message);
            console.log(stabObj);

            if(stabObj.type == "pharmacy"){
                connectedPharmacies[`${stabObj.id}`] = new PharmacyClient(stabObj.id ,client)
                client.send(ChatTemplates.createConnection(true));
                console.log(stabObj.type ,connectedPharmacies);
                
            }else if(stabObj.type == "customer"){
                connectedCustomers[`${stabObj.id}`] = new CustomerClient(stabObj.id , client);
                client.send(ChatTemplates.createConnection(true));
                console.log(stabObj.type ,connectedCustomers);
            }

            return;
        // request pharmacy
        }else if(ChatTemplates.isPharmacyRequest(message)){
            const reqObj = ChatTemplates.readPharmacyRequest(message);
            const pharmacy = connectedPharmacies[`${reqObj.pharmacyId}`];


            if(!pharmacy) return client.send(ChatTemplates.acceptClient(false , reqObj.customerId));

            // while(1){
            //     console.log('sent');
            //     pharmacy.client.send("checking");
            // }

            sendChatBoxRequest([pharmacy] , reqObj.customerId);

            return;

        }else if(ChatTemplates.isAcceptClient(message)){
            const reqClientObj = ChatTemplates.readChatBoxAcceptRequestFromServer(message);
            console.log(reqClientObj);

            if(reqClientObj.accept == true){
            
                const customer = connectedCustomers[`${reqClientObj.customerId}`];
                const pharmacy = connectedCustomers[`${reqClientObj.id}`];
                customer.client.send(ChatTemplates.chatBoxAcceptRequestFromServerToClient(true , reqClientObj.id , reqClientObj.customerId));

                /**
                 * @type {WebSocket}
                 */
    

                // server.halfDuplexConnection(client , customer.client )
            }

            return;
        
        }else{
            const {opcode , data: msgObj} = ChatTemplates.decodeString(message);

            if(!msgObj.toId || !msgObj.id || !msgObj.to) return; 

            if(msgObj.to == "pharmacy"){
                connectedPharmacies[`${msgObj.toId}`].client.send(ChatTemplates.message({
                    to :"pharmacy",
                    from :"customer",
                    toId : msgObj.toId,
                    fromId : msgObj.id,
                    msg : msgObj.message,
                }))
            }else if(msgObj.to == "customer"){
                connectedCustomers[`${msgObj.toId}`].client.send(ChatTemplates.message({
                    to :"customer",
                    from :"pharmacy",
                    toId : msgObj.toId,
                    fromId : msgObj.id,
                    msg : msgObj.message,
                }))
            }
        }


    }catch(e){
        console.log(e);
        client.send(`STABLISH=${JSON.stringify({
                status:"error",
        })}`)

    }
})


 



module.exports  = server;