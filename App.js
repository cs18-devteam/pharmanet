const http = require('node:http');
const path = require('path');
const fs = require('fs');
const Router = require('./common/Router');

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


module.exports = class App{
    static #app = undefined;
    static server = undefined;
    #files = [];
    static #routes = [];

    constructor({port = "8000", hostname = "localhost"}={}){

        this.port = port;
        this.hostname = hostname;

        App.server = http.createServer(async (req, res)=>{

            //parse url
            const url = new URL(req.url , `http://${req.headers.host}`);
            req.params = url.searchParams;

            req.pathname = url.pathname.replace(/%20/g , ' ').replace(/\\/g , "/");
            req.protocol = url.protocol;

            // for development cases
            if(process.env.NODE_ENV == "development"){
                console.log(`${req.method} ${req.pathname}`)
            }

            const isFound = await this.findFile(req , res);

            
            if(!isFound) this.findRoute(req,res);
        });

    }

    async findFile(req , res){
        const [file] = this.#files.filter(file=>file.url == req.pathname);



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
                    console.log(func);
                    this.#execute(req , res ,func.getHandler);
                    return;
                case "POST":
                    this.#execute( req , res ,func.postHandler);
                    return;
                case "PATCH":
                    this.#execute(req , res ,func.patchHandler);
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
        };

        App.#routes.push(routeObj);

    }

    run(){
        App.server?.listen(this.port.replace('\r', ''), this.hostname , ()=>{
            console.log(process.env.NODE_ENV)
            console.log(`app is running on http://${this.hostname}:${this.port}`);
            if(String(process.env.NODE_ENV) == "development"){

            }
        })
    }

    public(directory){
        const directoryPath = path.join(__dirname , directory);
        const fileNames = fs.readdirSync(directoryPath , {encoding:'utf-8' , recursive: true});
        fileNames.forEach(file=>{

            const filePath = path.join(directory , file);
            const fileUrl = "/"+ path.relative(directory , filePath);

            
            this.#files.push({
                file: filePath.replaceAll('\\','/') , 
                url : fileUrl.replaceAll('\\','/'),
            });


        });   

    }

    static getInstance(){
        if(!App.#app){
            App.#app = new App({
                port:process.env.APP_PORT,
                hostname: "localhost",
            });
            console.log("app created.");
            return App.#app;
        }
        return App.#app;
    }
}