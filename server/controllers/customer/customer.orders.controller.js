const { getRequestData } = require("../../common/getRequestData");
const { responseJson } = require("../../common/response");
const PharmacyOrders = require("../../models/PharmacyOrderModel");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerOrders = async (req , res)=>{
    try{
        const customerId = req.customerId;
        

        return response(res , view("customer.orders" , {
            header : view('component.header' , {
                name:"Orders || Pharmanet",
            }),
            footer: view('footer'),
            cart : view('customer/component.cart'),
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res, view('404') , 404);
    }
}



exports.createOrder = async (req , res)=>{
    await PharmacyOrders.startTransact();
    try{
        const reqData = JSON.parse(await getRequestData(req));

        



    }catch(e){
        
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message: e.message , 
            error: e,
        })
    }
}