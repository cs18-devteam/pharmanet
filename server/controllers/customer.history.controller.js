const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerHistory = async (req , res)=>{
    return response(res , view("customer.history") , 200);
}