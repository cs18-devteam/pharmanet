const getMultipartData = require("../common/getMultipartData");
const { response } = require("../common/response");

exports.multipart = ()=>{
    return async (req , res , next)=>{
        try{
            req.form = await getMultipartData(req);
        }catch(e){
            console.log(e);
            req.form = {};
            next();
            
        }
    }
}