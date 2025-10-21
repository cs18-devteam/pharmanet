const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerProfile = async (req , res)=>{
    return response(res , view("customer.profile") , 200);
}