const { response } = require("../common/response");
const view = require("../common/view");

exports.renderSignup = async (req , res)=>{
    return response(res , view('signup') , 200);
}