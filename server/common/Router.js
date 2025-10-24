const { authenticate } = require("./encrypt");
const notFound = require("./notFound");
const { response } = require("./response");
const view = require("./view");

class Router{
    #user;
    #globalAccess = [];
    #authenticate = false;

    constructor(req , res){
        this.req = req ;
        this.res = res;
    }


    access(access = []){
        this.#globalAccess = [...access];
    }


    authenticate(){
        this.#authenticate = true;
        return this;
    }

    async #authentication(){        
        this.#user =await authenticate(this.req  , this.res)
        if(this.#user){
            this.req.authenticate = true;
            return this;
        }
        return null;
    }



    async #verify(access){
        const localAccess = [...access];

        if(localAccess.length){
            console.log(localAccess)
            if(!localAccess.includes(this.#user?.role)) response(this.res , "Not Authenticated" , 408);
            return false;
        }else if(this.#globalAccess.length){
            console.log('global')
            if(!this.#globalAccess.includes(this.#user?.role)) response(this.res , "Not Authenticated" , 408);
            return false;
        }

        return true;
    }

    
    get(handler , access = []){
        if(this.req?.method != "GET") return this;
        this.getHandler = handler;
        (this.#authenticate ? this.#authentication() : Promise.resolve(true))
            .then((value) => value ? this.#verify(access)  : Promise.resolve(true))
            .then((value)=>(value) && handler(this.req  , this.res));
    }

    delete(handler ,access  = []){
        if(this.req?.method != "DELETE") return this;
        this.deleteHandler = handler;
        this.#verify(access).then(()=>handler(this.req  , this.res));
    }

    update(handler , access = []){
        if(this.req?.method != "PATCH") return this;
        this.updateHandler = handler;
        this.#verify(access).then(()=>handler(this.req  , this.res));
    }

    post(handler , access = []){
        if(this.req?.method != "POST") return this;
        this.postHandler = handler;
        this.#verify(access).then(()=>handler(this.req  , this.res));
    }

    middleware(middlewareFunc){
        middlewareFunc(this.req , this.res);
        return this;
    }

}

class AppRouter{
    constructor(req , res){
        this.req = req;
        this.res = res;
    }

    static pipe(req , res){
        const router = new AppRouter(req , res);
        return router;
    }

    route(path){

        if (this.req.completed) return null;

        const pathDestructure = path.split('/').slice(1);
        const urlDestructure = this.req.path.split('/').slice(1);
        let isMatch = true;
        const urlParams = [];

        
        
        if(!pathDestructure.length) return null;
        if(pathDestructure.length != urlDestructure.length) return null;
        
        
        for(let index=0 ; index < pathDestructure.length && isMatch == true ; index++){
            
            
            if(pathDestructure[index].startsWith(":")){
                urlParams.push([pathDestructure[index].slice(1), urlDestructure[index]]);
                continue;
            }else if(pathDestructure[index] != urlDestructure[index]){
                isMatch = false;
                break;
            }
                
        }

        if(isMatch) {
            this.req.completed = true;
            urlParams.forEach(([name , value]) => this.req[name] = value);
            return new Router(this.req , this.res);
        }

        return null;

        
    }


    end(handler){
        if(!handler) handler = notFound;
        if(!this.req.completed) return handler(this.req , this.res);
        
    }   
}

module.exports = AppRouter;