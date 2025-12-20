const Model = require("./Model");
const { responseJson, response } = require("./response");
const view = require("./view");
const model = new Model();


exports.apiCatchAsync =  (func)=>{
    return async (req , res) =>{
        try{
            // await model.startTransact();
            await func(req , res);
            // await model.commit();
        }catch(error){
            await model.rollback();
            console.log(error);
            responseJson(res , 400 , {
                status:"error",
                message :error.message,
                stack : error
            })
        }
    }
}
exports.catchAsync = (func)=>{
    return async (req , res) =>{
        try{
            // await model.startTransact();
            await func(req , res);
            // await model.commit();
        }catch(error){
            await model.rollback();
            console.log(error);
            response(res , view('404') , 400);
        }
    }
}




