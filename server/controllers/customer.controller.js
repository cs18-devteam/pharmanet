const { response } = require("../common/response")
const view = require("../common/view")

exports.renderCustomerHome = async (req , res)=>{
    return response(res , view('customer.home') , 200);
}