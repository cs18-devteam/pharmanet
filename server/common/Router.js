const Users = require("../models/UserModel");
const { verifyUser } = require("./Auth");
const { authenticate } = require("./encrypt");
const notFound = require("./notFound");
const { response, responseJson } = require("./response");

class Router{
    #user;
    #globalAccess = [];
    #authenticateUser = false;
    #id = undefined;

    constructor(req , res){
        this.req = req ;
        this.res = res;
    }

    access(access = []){
        this.#globalAccess = [...access];
    }

    async #authenticate(){
        try{

            console.log("is authentication on " , this.#authenticateUser);
            if (!this.#authenticateUser) return true;
            this.#authenticateUser =  await verifyUser(this.req  , this.res , this.#id);
            console.log(  this.#id," auth" ,this.#authenticateUser)
            return this.#authenticateUser;
        }catch(e){
            console.log(e);
        }
    }

    authenticate(id){
        this.#id = id;
        this.#authenticateUser = true;
        return this;
    }
    



    async #verify(access , id){
        const localAccess = [...access];
        if(!this.#id) return true;
        this.#user = await Users.getById(id);

        try{

            
            if(localAccess.length){
                console.log(localAccess)
                if(!localAccess.includes(this.#user?.role)) response(this.res , "Not Authenticated" , 408);
                return false;
            }else if(this.#globalAccess.length){
                console.log('global')
                if(!this.#globalAccess.includes(this.#user?.role)) response(this.res , "Not Authenticated" , 408);
                return false;
            }
        }catch(e){
            console.log(e);
        }

        return true;
    }

    
    get(handler = async ()=>{} , access = []){
        try{

        if(this.req?.method != "GET") return this;
        this.getHandler = handler;
        

        this.#authenticate().then(value=>{
            console.log("authenticated " , value);
            if(value){
                console.log("authenticated correctly");
                this.#verify(access , this.#id).then((value)=>{
                    if(value){
                        return handler(this.req  , this.res).catch(e=>{
                            console.log(e)
                            throw e;
                        });
                    }else{
                        return response(this.res , "you don't have access" , 400);
                    }
                }).catch(e=>{
                    console.log(e);
                });
            }else{
                console.log("not authenticated");
                return response(this.res , "authentication failed" , 302 , {
                    location :"/login",
                })
            }
        })
        }catch(e){
            console.log(e);
            return responseJson(this.res , 500 , {
                status:"error",
                message :"internal server error",
                error: e,
            } )
        }

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