module.exports = class Router{
    constructor(path){

    }

    #call(callback){
        callback(req , res);
    }

    get(callback){
        this.getHandler = callback;
    }

    post(callback){
        this.postHandler = callback;
    }

    patch(callback){
        this.patchHandler = callback;

    }

    delete(callback){
        this.deleteHandler = callback;

    }
}