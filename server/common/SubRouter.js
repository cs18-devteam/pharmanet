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


    subRoute(path , router){
        router.path(path);
        this.#routes.push(router);
        return this;
    }

    execute(req , res){

    }

    static pipe(req , res){
        return new SubRouter(req , res);
    }

}


module.exports = SubRouter;