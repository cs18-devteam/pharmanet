const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerBlogs = async (req , res)=>{
    try{

        return response(res , view("customer.blogs" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            footer: view('footer'),
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}