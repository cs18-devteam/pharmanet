const { getRequestData } = require("../../common/getRequestData");
const { response } = require("../../common/response");
const view = require("../../common/view");
const Payment = require("../../payhere/Payment");

exports.redirectToPaymentGateWay = async (req , res)=>{
    const payment = {
        orderId : 12345,
        amount: 1000,
        merchantId : Payment.getMerchantId(),
    }
    
    const hash = Payment.createHash({
        orderId : payment.orderId,
        amount : payment.amount,
    });

    return response(res , view('payment' , {
        hash : hash,
        merchantId : Payment.getMerchantId(),
        amount : payment.amount + ".00",
        orderId : payment.orderId,
    }) , 200);


}


