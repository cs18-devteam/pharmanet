const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const response = require('./common/response');
const notfound = require('./common/notfound');
const apiLeaveRouter = require('./routes/apiLeaveRouter');
const status = require('./routes/status');


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
        if (path == '/blogs'){
            return apiLeaveRouter(req , res);
        }else if(path == "/api/blogs"){ 
            return apiLeaveRouter(req , res);
        }else if(path == "/api/blogs/status"){
            return status(req , res);
        }else{
            return notfound(req ,res);
        }
        




    

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})


module.exports = server;