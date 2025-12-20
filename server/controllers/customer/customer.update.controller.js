const { response } = require("../common/response");
const view = require("../common/view");


exports.renderUpdateProfile = async (req , res)=>{
    try{

        return response(res , view("customer.update" , {
            header : view('component.header' , {
                name:"Update Your Account",
            }),
            cart : view('customer/component.cart'),
            footer: view('footer'),
        }) , 200);
    }catch(e){
        return response(res , view('404') , 404);
    }
}


