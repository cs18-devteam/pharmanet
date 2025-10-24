const { response } = require("../common/response");
const view = require("../common/view");


exports.renderUpdateProfile = async (req , res)=>{
    return response(res , view("customer.update") , 200);
}


