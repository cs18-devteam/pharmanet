const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerOrders = async (req , res)=>{
    return response(res , view("customer.orders") , 200);
}