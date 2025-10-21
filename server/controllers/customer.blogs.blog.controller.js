const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerBlog = async (req , res)=>{
    return response(res , view("customer.blogs.blog") , 200);
}