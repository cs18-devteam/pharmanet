const { response } = require("../common/response")
const view = require("../common/view")

exports.renderVerifyEmail = async (req , res)=>{
    return response(res , view('verify.email') , 200);
}