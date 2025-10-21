const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const response = require('./common/response');
const notfound = require('./common/notfound');
const apiPharmacyRouter = require("./routes/apiPharmacyRouter");



const { spawn } = require('child_process');

function restartServer() {
  console.log('Restarting server...');
  // spawn a new instance of this same script
  spawn(process.argv[0], process.argv.slice(1), {
    stdio: 'inherit'
  });
  process.exit(); // exit the current instance
}


const server = http.createServer((req , res)=>{
    try{
        const {url , method} = req;
        const URI = new URL(url , `http://${process.env.HOSTNAME}:${process.env.PORT}`);
        const params = URI.searchParams;
        const path = URI.pathname;

        req.path = path;
        req.params = params;

        //set public folder 
        const file = requestFile(path);
        if(file){
            res.writeHead(200 , {
                "content-type" : file.type,
            });
            res.write(file.content);
            res.end();
            return;
        }
        if(process.env.NODE_ENV == "development"){
            console.log(method , url  , path)
        }
    
        // product routes
        if (path == '/pharmacies'){
            return apiPharmacyRouter(req , res);
        }else if(path == "/api/pharmacies"){ 
            return apiPharmacyRouter(req , res);
        }else{
            return notfound(req ,res);
        }
        




    

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
            restartServer();

        })
    }
    


})


module.exports = server;