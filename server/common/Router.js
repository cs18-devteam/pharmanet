const notFound = require("./notFound");

class Router{
    constructor(req , res){
        this.req = req ;
        this.res = res;
    }
    
    get(handler){
        if(this.req?.method != "GET") return this;
        handler(this.req  , this.res);
        return this;
        
    }

    delete(handler){
        if(this.req?.method != "DELETE") return this;
        this.deleteHandler = handler;
        this.deleteHandler(this.req , this.res);
    }

    update(handler){
        if(this.req?.method != "UPDATE") return this;
        this.updateHandler = handler;
        this.updateHandler(this.req , this.res);
    }

    post(handler){
        if(this.req?.method != "POST") return this;
        this.postHandler = handler;
        this.postHandler(this.req , this.res);
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
        // const urlParams = [];
        // let urlPath = path.split('/');
        // let regText = new RegExp(urlPath.map((value , index) => {
        //     if(value.startsWith(":")){
        //         urlParams.push({index :index ,value: value.slice(1 , value.length)});
        //         return ".";
        //     }
        //     return value;
        // }).join('\\/') , "yg");

        
        // if(regText.test(this.req.path)){
        //     urlParams.forEach(param=> this.req[param.value] = this.req.path.split("/")[param.index]);
        //     return new Router(this.req , this.res);
        // }



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