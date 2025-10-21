const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderBlogs = async (req , res)=>{
    return response(res , view("blogs") , 200);
}