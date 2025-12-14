const getMultipartData = require("../../common/getMultipartData")
const { responseJson } = require("../../common/response")

exports.uploadPrescriptions = async (req , res)=>{
    try{
        const reqData = await getMultipartData(req);
        const file = reqData.prescription;

        if(file){
            file.rename(`${req.customerId}-${Date.now()}.${file.fileName.split('.').slice(-1)[0]}`);
            const saved = await file.save("/prescriptions");
            return responseJson(res , 200 , {
                status:"success",
                path : saved.path.split('/storage/').slice(-1)[0],
            })

        }else{
            throw new Error("file not found");
        }




    }catch(e){
        return responseJson(res , 400 , {
            status:"error",
            error:e,
            message:"can't upload prescription",
        })
    }
}