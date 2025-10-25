module.exports = class Router{
<<<<<<< HEAD

    getHandler = []
    postHandler = []
    deleteHandler = []
    updateHandler = []


=======
<<<<<<< HEAD
>>>>>>> origin/hamdha/backend/order
    constructor(){}

<<<<<<< HEAD
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
<<<<<<< HEAD
=======
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
        this.deleteHandler = callback;
=======

    getHandler = []
    postHandler = []
    deleteHandler = []
    updateHandler = []


    constructor(){}

>>>>>>> origin/hamdha/backend/order
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
<<<<<<< HEAD
    
    delete(...callback){
        callback.forEach(clb=>this.deleteHandler.push(clb));
<<<<<<< HEAD
=======

    delete(callback = (req, res)=>{}){
<<<<<<< HEAD
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
        this.deleteHandler = callback;
>>>>>>> origin/hamdha/backend/leave
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order

    }
}
