const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminCustomers = async (req , res)=>{
    return response(res , view("admin.customers") , 200);
}