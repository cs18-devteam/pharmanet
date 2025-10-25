const http = require('node:http');
const path = require('path');
const fs = require('fs');
<<<<<<< HEAD
const Router = require('./common/Router');
=======
<<<<<<< HEAD
=======
const Router = require('./common/Router');
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order

const mimeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico":"image/icon"
};

<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
module.exports = class App{
    static #app = undefined;
    static server = undefined;
    #files = [];
    static #routes = [];

<<<<<<< HEAD
    constructor({port = "8000", hostname = "localhost"}={}){

=======
<<<<<<< HEAD
    constructor({port = "8080", hostname = "localhost"}={}){
=======
    constructor({port = "8000", hostname = "localhost"}={}){

>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
        this.port = port;
        this.hostname = hostname;

        App.server = http.createServer(async (req, res)=>{

            //parse url
            const url = new URL(req.url , `http://${req.headers.host}`);
            req.params = url.searchParams;
<<<<<<< HEAD

            req.pathname = url.pathname.replace(/%20/g , ' ').replace(/\\/g , "/");
=======
<<<<<<< HEAD
            req.pathname = url.pathname;
=======

            req.pathname = url.pathname.replace(/%20/g , ' ').replace(/\\/g , "/");
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
            req.protocol = url.protocol;

            // for development cases
            if(process.env.NODE_ENV == "development"){
                console.log(`${req.method} ${req.pathname}`)
            }

<<<<<<< HEAD
=======
<<<<<<< HEAD
            //handle special case
            if(req.pathname == "/"){
                req.pathname = '/index.html';
            };


            const isFound = await this.findFile(req,res);
            if(!isFound) this.findRoute(req , res);
=======
>>>>>>> origin/hamdha/backend/order

            res.send = (html)=>{
                res.writeHead(200 , {"content-type":"text/html"});
                res.write(html);
                res.end();
            }



            const isFound = await this.findFile(req , res);

            
            if(!isFound) this.findRoute(req,res);
<<<<<<< HEAD
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
        });

    }

    async findFile(req , res){
        const [file] = this.#files.filter(file=>file.url == req.pathname);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD


=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
        
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
        
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
>>>>>>> origin/hamdha/backend/leave

=======

<<<<<<< HEAD
=======


>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
=======
>>>>>>> origin/hamdha/frontend/order
        if(file){
            const fileExt = path.extname(file.url);
            fs.readFile(file.file , (error , data)=>{
                if(error) throw error;

                const fileData = data;
                res.writeHead(200, {"Content-Type": mimeMap[fileExt] || 'text/plain'} )
                res.write(fileData);
                res.end();
                return true;
            })
        }else{
            if(process.env.NODE_ENV == "development"){
                console.log(404 ,req.pathname , 'not found')
            }
        }

        return false;
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
    async findRoute(req , res){
        try{
            App.#routes.forEach(async (route)=>{

                if(route.path == req.pathname ){
                    const method = req.method;
                    switch(method){
                        case "GET":
                            route.router.getHandler(req, res);
                            break;
                        case "POST":
                            route.router.postHandler(req,res);
                            break;
                        case "PATCH":
                            route.router.patchHandler(req , res);
                            break;
                        case "DELETE":
                            route.router.deleteHandler(req , res);
                            break;
                    }
                }
                return;

            })

        }catch(error){
            console.log("error : find Route method");
        }
    }

    route(path , router){
        const routeObj = {
            path ,
            router ,
=======
>>>>>>> origin/hamdha/backend/order
    #next(req , res , func){
        if(typeof func == "function"){
            return func(req , res);
        }
        if(func instanceof Array){
            if(func.length == 0) return;
            func.forEach(f=>this.#next(req , res , f));
            return;
        }

        if(func instanceof Router){
            const method = req.method;
            switch(method){
                case "GET":
                    this.#execute(req , res ,func.getHandler);
                    return;
                case "POST":
                    this.#execute( req , res ,func.postHandler);
                    return;
                case "PATCH":
                    console.log(func.updateHandler);
                    this.#execute(req , res ,func.updateHandler);
                    return;
                case "DELETE":
                    this.#execute(req , res ,func.deleteHandler);
                    break;
            }
        }

    }


    #execute(req , res , handlers = []){
        this.#next(req , res , handlers);
    }


    async findRoute(req ,res){
        try{
            let isRouteFound = false;


            App.#routes.forEach((route)=>{
                if(route.path == req.pathname ){
                    this.#execute( req , res,route.router);
                }

            })

            return isRouteFound;

        }catch(error){
            console.log("error : find Route method" , error);
        }
    }

    route(path , ...handlers){
        const routeObj = {
            path ,
            router : handlers,
<<<<<<< HEAD
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
        };

        App.#routes.push(routeObj);

    }

    run(){
<<<<<<< HEAD
        App.server?.listen(this.port.replace('\r', ''), this.hostname , ()=>{
            console.log(process.env.NODE_ENV)
            console.log(`app is running on http://${this.hostname}:${this.port}`);
            if(String(process.env.NODE_ENV) == "development"){
=======
        App.server?.listen(this.port , this.hostname , ()=>{
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
            
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
=======
>>>>>>> origin/hamdha/frontend/order
            if(process.env.NODE_ENV == "development"){
                console.log(`app is running on http://${this.hostname}:${this.port}`);
>>>>>>> origin/hamdha/backend/leave

            }
        })
    }

    public(directory){
        const directoryPath = path.join(__dirname , directory);
        const fileNames = fs.readdirSync(directoryPath , {encoding:'utf-8' , recursive: true});
        fileNames.forEach(file=>{

            const filePath = path.join(directory , file);
            const fileUrl = "/"+ path.relative(directory , filePath);

<<<<<<< HEAD
            this.#files.push({

                file: filePath.replaceAll('\\','/') , 
                url : fileUrl.replaceAll('\\','/'),

=======
<<<<<<< HEAD
            
            this.#files.push({
                file: filePath , 
                url : fileUrl,
=======
            this.#files.push({
                file: filePath.replace(/%20/g , ' ').replace(/\\/g , "/") , 
                url : fileUrl.replace(/%20/g , ' ').replace(/\\/g , "/"),
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
            });


        });   

    }

    static getInstance(){
        if(!App.#app){
            App.#app = new App({
                port:process.env.APP_PORT,
<<<<<<< HEAD
                hostname: "localhost",
=======
<<<<<<< HEAD
                hostname: process.env.DEVELOPMENT_HOSTNAME,
=======
                hostname: "localhost",
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
            });
            console.log("app created.");
            return App.#app;
        }
        return App.#app;
    }
}