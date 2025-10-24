const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerBlogs = async (req , res)=>{
    return response(res , view("customer.blogs") , 200);
}