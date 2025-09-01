module.exports = class Router{
    constructor(){}

<<<<<<< HEAD
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
=======
    #call(callback = (req,res)=>{}){
        try{
            callback(req , res);

        }catch(error){
            console.log(error);
        }
    }

    get(callback = (req,res)=>{}){
        this.getHandler = callback;
    }

    post(callback =  (req,res)=>{}){
        this.postHandler = callback;
    }

    patch(callback = (req, res)=>{}){
        this.patchHandler = callback;
    }

    delete(callback = (req, res)=>{}){
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
        this.deleteHandler = callback;

    }
}
