const env = require('./common/middlewares/env');
env();

const {fileServer} = require('./fileServer');
const server = require('./httpServer');
const DB = require("./database/Database");
DB.getInstance();

fileServer("./public");

server.listen(process.env.PORT , process.env.HOSTNAME , ()=>{
    console.log(`${process.env.DATABASE_NAME} running on http://${process.env.HOSTNAME}:${process.env.PORT}`);
})


