const http = require('node:http');
const path = require('path');
const fs = require('fs');

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

    constructor({port = "8080", hostname = "localhost"}={}){
        this.port = port;
        this.hostname = hostname;

        App.server = http.createServer(async (req, res)=>{

            //parse url
            const url = new URL(req.url , `http://${req.headers.host}`);
            req.params = url.searchParams;
            req.pathname = url.pathname;
            req.protocol = url.protocol;

            // for development cases
            if(process.env.NODE_ENV == "development"){
                console.log(`${req.method} ${req.pathname}`)
            }

            //handle special case
            if(req.pathname == "/"){
                req.pathname = '/index.html';
            };


            const isFound = await this.findFile(req,res);
            if(!isFound) this.findRoute(req , res);
        });

    }

    async findFile(req , res){
        const [file] = this.#files.filter(file=>file.url == req.pathname);
<<<<<<< HEAD
=======
        
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0

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
        };

        App.#routes.push(routeObj);

    }

    run(){
        App.server?.listen(this.port , this.hostname , ()=>{
<<<<<<< HEAD
            
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
            if(process.env.NODE_ENV == "development"){
                console.log(`app is running on http://${this.hostname}:${this.port}`);

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
                file: filePath , 
                url : fileUrl,
            });
        });   

    }

    static getInstance(){
        if(!App.#app){
            App.#app = new App({
                port:process.env.APP_PORT,
                hostname: process.env.DEVELOPMENT_HOSTNAME,
            });
            console.log("app created.");
            return App.#app;
        }
        return App.#app;
    }
}