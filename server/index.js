const env = require('./common/middlewares/env');
env();

const {fileServer} = require('./fileServer');
const server = require('./httpServer');
const socketServer = require('./socketServer');
const DB = require("./database/Database");
const Pharmacies = require('./models/PharmacyModel');
DB.getInstance();

fileServer("./public" , "./storage"); // for static files

server.listen(process.env.PORT , process.env.HOSTNAME , ()=>{
    console.log(`${process.env.DATABASE_NAME} running on http://${process.env.HOSTNAME}:${process.env.PORT}`);
})

socketServer.listen(process.env.SOCKET_PORT , process.env.HOSTNAME ,async ()=>{
    console.log( await Pharmacies.query("update this.table set alive=false where id > 0"));
    console.log(`web socket is running on ws://${process.env.HOSTNAME}:${process.env.SOCKET_PORT}`);
})



// process.on("SIGINT", shutdown);
// process.on("SIGTERM", shutdown);

// async function shutdown(){
//     console.log('server shutting down');
//     await Pharmacies.query('update this.table set alive=false where id > 0');
//     server.close();
//     process.exit();
// }