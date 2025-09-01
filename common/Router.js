module.exports = class Router{
    constructor(){}

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
        this.deleteHandler = callback;

    }
}
