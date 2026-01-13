const path = require("path");
const AppRouter = require("./AppRouter");
const Router = require("./Router");
const fs = require('fs/promises');

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

    static async save(filepath="./routes.ReadME.Md"){
        try{
            
            await fs.writeFile(path.join(__dirname , "/../" , filepath), this.#getRoutes(true).flat().join('\n'));
        }catch(e){
            console.log(e);   
        }
    }


    static #getRoutes(absolute=false){
        return SubRouter.#Routers.map((router )=>{
            return router.getRoute(absolute);
            
        }) 
    }

    getRoute(absolute=false){
        return this.#routes.map(e=>{
            if(absolute){
                return e.absPath; 
            }else{
                return e.path;   
            }
        
        })
    }

    print(absolute = false){
        this.#routes.map(e=>{
            if(absolute){
                console.log(e.absPath); 
            }else{
                console.log(e.path);   
            }
        
        })
        
    }



    subRoute(path , {
        get = async () => {} , 
        post = async () => {} , 
        update = async () => {} , 
        delete:del = async () => {},
    } = {}){   
             
        const router = Router.create();
        router.route(path);
        router.get(get);
        router.post( post);
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