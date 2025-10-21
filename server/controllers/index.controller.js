const { response } = require("../common/response");
const view = require("../common/view");


exports.renderIndexPage =async ( req , res)=>{
    response(res , view('index') , 200);
}



