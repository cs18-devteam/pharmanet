const { response } = require("../common/response");
const view = require("../common/view");


exports.renderContactus = async (req , res)=>{
    return response(res , view("contactus") , 200);
}