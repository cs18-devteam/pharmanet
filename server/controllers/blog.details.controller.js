const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderBlogDetails = async (req , res)=>{
    return response(res , view("blog.details") , 200);
}