const { response } = require("../common/response")
const view = require("../common/view")

exports.renderVerifyNumber = async (req , res)=>{
    return response(res , view('verify.number') , 200);
}