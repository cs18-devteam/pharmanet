const { apiCatchAsync } = require("../../common/catchAsync");
const getMultipartData = require("../../common/getMultipartData")
const { responseJson } = require("../../common/response");
const PharmacyOrders = require("../../models/PharmacyOrderModel");

exports.uploadPrescriptions = apiCatchAsync(async (req , res)=>{
        const reqData = await getMultipartData(req);
        const file = reqData.prescription;
        const orderId = reqData.orderId;

        if(file){
            file.rename(`${req.customerId}-${Date.now()}.${file.fileName.split('.').slice(-1)[0]}`);
            const saved = await file.save("/prescriptions");
            const path = saved.path.split('/storage/').slice(-1)[0];

            const order = await PharmacyOrders.update({
                id: orderId ,
                prescription : path,
            })

            return responseJson(res , 200 , {
                status:"success",
                path ,
                orderId : orderId,
            })

        }else{
            throw new Error("file not found");
        }
})