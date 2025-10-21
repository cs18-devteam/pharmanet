const Registry = require("./Registry/Registry");
const { response }  = require("./response");

class Bridge{
    #connectionReq = undefined;
    #connectionRes = undefined;
    #promise = undefined;
    #body;
    #method;
    #headers;
    #url;
    static registry = Registry;

    constructor(req , res){
        this.req = req;
        this.res = res;
    }


    async middleware(middleware){
        this.#promise = this.#promise?.then(()=>middleware(req , res)).catch(error=>{throw error});
        return this;
    }

    connect(url = "" , {
        method = 'GET',
        headers = {
            "Content-type" : "application/json"
        },
    } = {}){
        this.#headers = headers;
        this.#method = method;
        this.#url = url;
        
        return this;
    }


    resend(func = (data)=>{return " "}, statusCode = 200 , headers = {
        "Content-type" : "text/html",
    }){
        this.#promise = this.#promise.then((data)=>{
            response(this.res , func(data) || " " , statusCode , headers);
        }).catch(error=>{throw error});

        return this.#promise;
    }

    request(func =async (req , res)=>""){
        this.#promise = func(this.req , this.res) || Promise.resolve();

    
        
        this.#promise = this.#promise.then((body = {})=>{
            const options = {
                headers : this.#headers,
                method : this.#method,
            }


            if(this.#method == "GET"){
                const params = Object.entries(body)
                    .map(([name , value])=>
                            `${name}=${value}`
                    ).join('&');
                this.#url = `${this.#url}?${params}`;
            }else{
                this.#body = body;
                options.body = this.#body;
            }
            return fetch(this.#url , options );
        }).catch(error=>{throw {error}});

        return this;
    }

    json(func = async (json , req , res)=>{}){
        this.#promise = this.#promise.then((res)=> {
            try{
                return res.json();
            }catch(error){
                throw {error , res};
            }
        }).catch(error=>{throw error});


        this.#promise = this.#promise
            .then((data)=>{
                this.#body = data;
                return func(this.#body , this.req , this.res);
            })
            .then(out => out || this.#body)
            .catch(error=>
                {throw {error}}
            );
        return this;
    }


    static pipe(req , res){
        return new Bridge(req , res);
    }
}

Bridge.registry.health();


module.exports = Bridge;