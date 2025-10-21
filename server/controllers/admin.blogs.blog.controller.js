const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminBlogsBlog = async (req , res)=>{
    return response(res , view("admin.blogs.blog") , 200);
}