
class Router{
    path = undefined;
    getHandler =async ()=>{};
    postHandler =async ()=>{};
    updateHandler =async ()=>{};
    deleteHandler =async ()=>{};

    path(path){
        this.path = path;
        return this;
    }

    get(handler){
        this.getHandler = handler;
        return this;
    }

    delete(handler){
        this.deleteHandler = handler;
        return this;
    }

    update(handler){
        this.updateHandler = handler;
        return this;
    }

    post(handler){
        this.postHandler = handler;
        return this;
    }

    static create(){
        return new Router();
    }
}


module.exports = Router;