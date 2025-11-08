const AppRouter = require("./AppRouter");
const Router = require("./Router");

class SubRouter{
    static #Routers = [];
    #req = undefined;
    #res = undefined;
    #path = undefined;
    #routes = [];


    static route(path){
        const subRouter = new SubRouter();
        subRouter.#path = path;
        SubRouter.#Routers.push(subRouter);
        return subRouter;
        
    }


    static print(absolute = true){
        SubRouter.#Routers.forEach((router , )=>{
            router.print(absolute);
            
        })        
    }


    print(absolute = false){
        this.#routes.forEach(e=>{
            if(absolute){
                console.log(e.absPath);
                
                
            }else{
                console.log(e.path);   
            }
        
        })
    }




    subRoute(path , {
        get = async()=>{} , 
        post = async ()=>{} , 
        update = async ()=>{} , 
        delete:del = async () => {}
    } = {}){
        const router = Router.create();
        router.route(path);
        router.get(get);
        router.post(post);
        router.delete(del);
        router.update(update);
        router.absRoute(this.#path , path);
        this.#routes.push(router);
        
        return this;
    }

    pipe(req , res){
        this.#req = req;
        this.#res = res;

        this.#routes.forEach(router=>{            
            AppRouter.pipe(this.#req , this.#res).route(router.absPath)
            ?.get(router.getHandler)
            ?.post(router.postHandler)
            ?.update(router.updateHandler)
            ?.delete(router.deleteHandler);
        })




        return this;
    }

}


module.exports = SubRouter;