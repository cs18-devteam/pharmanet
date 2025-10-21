const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminBlogs = async (req , res)=>{
    return response(res , view("admin.blogs") , 200);
}