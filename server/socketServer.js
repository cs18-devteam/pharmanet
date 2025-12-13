const WebSocket = require('multiclient-websocket');
const Pharmacies = require('./models/PharmacyModel');

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
        pClient.client.send(`REQ_CLIENT=${JSON.stringify({
            customerId, 
        })}`);
    })


}



server.onClientConnect(( client)=>{
    console.log('new client connected');

})


server.onClientMessage((message , client)=>{
    try{

        //handle connection identification message
        if(message.startsWith("STABLISH=")){
            const stabObj = JSON.parse(message.replace("STABLISH=",''));
            if(stabObj.type == "pharmacy"){
                connectedPharmacies[stabObj.id] = (new PharmacyClient(stabObj.id ,client))
                client.send(`STABLISH=${JSON.stringify({
                    status:"success",
                })}`)
            }else if(stabObj.type == "customer"){
                connectedCustomers[stabObj.id] = (new CustomerClient(stabObj.id , client));
                client.send(`STABLISH=${JSON.stringify({
                    status:"success",
                })}`);
            }
        }else if(message.startsWith("REQ_PHR=")){
            const stabObj = JSON.parse(message.replace("REQ_PHR=" , ''));
            // checking pharmacy;
            const pharmacy = connectedPharmacies[`${stabObj.pharmacyId}`];
            sendChatBoxRequest([pharmacy] , stabObj.customerId);
        }else if(message.startsWith("RES_CLIENT=")){
            const reqClientObj = JSON.parse(message.replace("RES_CLIENT=" , ''));
            if(reqClientObj.accept == true){
                const customer = connectedCustomers[`${reqClientObj.customerId}`];
                customer.client.send(`RES_PHR=${JSON.stringify({
                    accept :true,
                })}`)

                server.fullDuplexConnection(client , customer.client )
            }
        }


    }catch(e){
        client.send(`STABLISH=${JSON.stringify({
                status:"error",
        })}`)

    }
})






module.exports  = server;