const http = require('node:http');


module.exports = class App{
    static #app = {};
    static server = undefined;

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

    static createApp({port , hostname}){
        App.#app = new App({port , hostname});
    }


    static routes(){

    }


    static getInstance(){
        if(!App.#app){
            return new App();
        }
        return App.#app;
    }
}