const { response } = require("../common/response");
const view = require("../common/view");

exports.renderLogin = async (req , res)=>{
    return response(res , view("login") , 200);
}