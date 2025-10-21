const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerOrder = async (req , res)=>{
    return response(res , view("customers.customer.order") , 200);
}