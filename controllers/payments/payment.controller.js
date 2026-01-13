const { getRequestData } = require("../../common/getRequestData");
const { responseJson } = require("../../common/response");
const Payment = require("../../payhere/Payment");

exports.generateHash = async (req , res)=>{
    try{

        const request = JSON.parse(await getRequestData(req));
        
        
        if(!request.orderId || !request.amount){
            throw new Error("orderId and amount must be defined to create hash");
        }
        
        const hash = Payment.createHash({
            orderId : request.orderId,
            amount: request.amount,
        })


        
        
        return responseJson(res , 200 , {
            status:"success",
            hash : hash,
            merchant_id : Payment.getMerchantId(),

        })
    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message: e.message,
            error :e,
        })
    }

}


