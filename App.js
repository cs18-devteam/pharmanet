const http = require('node:http');
const path = require('path');
const fs = require('fs');


module.exports = class App{
    static #app = {};
    static server = undefined;
    #files = [];

    constructor({
        port = "8080",
        hostname = "localhost",
    } = {}
    ){
        this.port = port;
        this.hostname = hostname;
        App.#app.routes = {};

        App.server = http.createServer((req, res)=>{
            console.log(req);
            res.writeHead(200 , "hellow");
        });

    }

    run(){
        App.server?.listen(this.port , this.hostname , ()=>{
            if(process.env.NODE_ENV == "development"){
                console.log(`app is running on \x1b[33mhttp://${this.hostname}:${this.port}\x1b[0m ...`);

            }
        })
    }

    public(directory){
        const directoryPath = path.join(__dirname , directory);
        const fileNames = fs.readdirSync(directoryPath , {encoding:'utf-8' , recursive: true});
        fileNames.forEach(file=>{
            this.#files.push(path.join(directory  , file));
        });   
        console.log(this.#files);     

    }




    static createApp({port , hostname}){
        App.#app = new App({port , hostname});
    }


    router(){
        return new Router()
    }


    static getInstance(){
        if(!App.#app){
            return new App();
        }
        return App.#app;
    }
}