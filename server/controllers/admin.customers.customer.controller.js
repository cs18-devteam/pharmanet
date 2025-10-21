const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminCustomerDetails = async (req , res)=>{
    return response(res , view("admin.customers.customer") , 200);
}


