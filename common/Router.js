module.exports = class Router{
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
        callback.forEach(clb=>this.postHandler.push(clb));
    }
    
    delete(...callback){
        callback.forEach(clb=>this.deleteHandler.push(clb));

    }
}
