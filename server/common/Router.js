
class Router{
    path = undefined;
    absPath = undefined;
    getHandler =async ()=>{};
    postHandler =async ()=>{};
    updateHandler =async ()=>{};
    deleteHandler =async ()=>{};
    
    route(path){
        this.path = path;
        return this;
    }

    absRoute(root,path){
        this.absPath = "/"+[ ...root.split('/') , ...path.split('/')].filter(key=> key != "").join('/');
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