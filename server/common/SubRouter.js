const Router = require("./Router");

class SubRouter{
    #req = undefined;
    #res = undefined;
    #path = undefined;
    #routes = [];

    constructor(req , res){
        this.#req = req;
        this.#res = res;
    }

    route(path){
        this.#path = path;
        return this;
    }

    print(absolute = false){

        if(!absolute){

            this.#routes.forEach(route=>{
                console.log(route);
            })
            
        }else{
            this.#routes.forEach(route=>{
                let path = [ ...this.#path.split('/') , ...route.path.split('/')].filter(key=> key != "").join('/');
                
                console.log(path);
            })
        }
        return this;
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
        this.#routes.push(router);
        return this;
    }

    static pipe(req , res){
        return new SubRouter(req , res);
    }

}


module.exports = SubRouter;