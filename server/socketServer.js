const WebSocket = require('multiclient-websocket');
const Pharmacies = require('./models/PharmacyModel');

const server = new WebSocket();

class PharmacyClient{
    constructor(id , client){
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
            console.log(connectedPharmacies[stabObj.id]);
        }






    }catch(e){
        client.send(`STABLISH=${JSON.stringify({
                status:"error",
            })}`)

    }
})




module.exports  = server;