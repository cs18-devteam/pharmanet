const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerOrderDetails = async (req , res)=>{
    return response(res , view("customer.orders.order") , 200);
}