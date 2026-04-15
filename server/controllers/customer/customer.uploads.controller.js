const { apiCatchAsync } = require("../../common/catchAsync");
const getMultipartData = require("../../common/getMultipartData")
const { responseJson } = require("../../common/response");
const PharmacyOrders = require("../../models/PharmacyOrderModel");

exports.uploadPrescriptions = apiCatchAsync(async (req , res)=>{
        const reqData = await getMultipartData(req);
        const file = reqData.prescription;
        const orderId = reqData.orderId;

        if(file){
            const fileName = `${req.customerId}-${Date.now()}.${file.fileName.split('.').slice(-1)}`
            const filePath = "/prescriptions";
            file.rename(fileName);
            const saved = await file.save(filePath);

            const order = await PharmacyOrders.update({
                id: orderId ,
                prescription : filePath + "/" + fileName,
            })

            return responseJson(res , 200 , {
                status:"success",
                path :filePath + "/" + fileName ,
                orderId : orderId,
            })

        }else{
            throw new Error("file not found");
        }
})