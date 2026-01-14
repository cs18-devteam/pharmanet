const env = require('./common/middlewares/env');
// if(process.env.NODE_ENV!="production"){
    // console.log("env variables created");
    env();
// }


const {fileServer} = require('./fileServer');
const server = require('./httpServer');
const socketServer = require('./socketServer');
const DB = require("./database/Database");
const Pharmacies = require('./models/PharmacyModel');
const ipaddress = require('./common/ipaddress');
const { dns } = require('./common/dns');
DB.getInstance();

// const isDomainActive = dns();
const isDomainActive =false;
fileServer("./public" , "./storage"); // for static files

const domain = ipaddress ? (isDomainActive ? process.env.DOMAIN_NAME : ipaddress) : 'localhost';

server.listen("0.0.0.0" ,  ()=>{
    console.log(`${process.env.DATABASE_NAME} running on https://${domain}:${process.env.PORT}`);
    console.log(`${process.env.DATABASE_NAME} running on https://localhost:${process.env.PORT}`);
})

socketServer.listen(process.env.SOCKET_PORT , process.env.HOSTNAME ,async ()=>{
    try{
        const results =  await Pharmacies.query("update this.table set alive=false where id > 0");
        if(results.affectedRows>1){
            console.log(`
                ------------ 
                ${results.affectedRows}pharmacies back to offline
                ------------
            `);
        }


        console.log(`web socket is running on wss://${domain}:${process.env.SOCKET_PORT}`);
        console.log(`web socket is running on wss://localhost:${process.env.SOCKET_PORT}`);

    }catch(e){
        console.log(e);
    }
})



// process.on("SIGINT", shutdown);
// process.on("SIGTERM", shutdown);

// async function shutdown(){
//     console.log('server shutting down');
//     await Pharmacies.query('update this.table set alive=false where id > 0');
//     server.close();
//     process.exit();
// }