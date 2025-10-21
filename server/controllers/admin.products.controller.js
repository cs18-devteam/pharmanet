const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminProducts = async (req , res)=>{
    return response(res , view("admin.products") , 200);
}


