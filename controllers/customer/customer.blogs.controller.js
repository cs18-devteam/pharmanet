const { catchAsync } = require("../../common/catchAsync");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerBlogs = catchAsync(async (req , res)=>{
        return response(res , view("customer.blogs" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            footer: view('footer'),
        }) , 200);
})