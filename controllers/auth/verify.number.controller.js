const { response } = require("../../common/response");
const view = require("../../common/view");

exports.renderVerifyNumber = async (req , res)=>{
    return response(res , view('verify.number' , {
        header : view('component.header' , {
          name:"Verify Your Mobile Number",
        })
    }) , 200);
}