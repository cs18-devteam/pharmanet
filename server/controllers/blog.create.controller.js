const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderBlogCreate = async (req , res)=>{
    return response(res , view("blog.create") , 200);
}