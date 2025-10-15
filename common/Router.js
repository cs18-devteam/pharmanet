module.exports = class Router{
<<<<<<< HEAD
    constructor(){}

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
=======

    getHandler = []
    postHandler = []
    deleteHandler = []
    updateHandler = []


    constructor(){}

    #call(callback = (req,res)=>{}){
        try{
            callback(req , res);

        }catch(error){
            console.log(error);
        }
    }

    get(...callback){
        callback.forEach(clb=>this.getHandler.push(clb));
        
    }
    
    post(...callback){
        callback.forEach(clb=>this.postHandler.push(clb));
    }
    
    patch(...callback){
        callback.forEach(clb=>this.updateHandler.push(clb));
    }
    
    delete(...callback){
        callback.forEach(clb=>this.deleteHandler.push(clb));
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf

    }
}
