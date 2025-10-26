const { responseJson } = require("./response");

function catchAsync (func){
    return async (req , res) =>{
        try{
            func();
        }catch(error){
            console.log(error);
            responseJson(res , 500 , {
                status:"error",
                message :"internal server error",
                stack : error
            })
        }
    }
}

module.exports = catchAsync;