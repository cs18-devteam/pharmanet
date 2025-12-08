const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerOrders = async (req , res)=>{
    try{

        return response(res , view("customer.orders" , {
            header : view('component.header' , {
                name:"Orders || Pharmanet",
            }),
            footer: view('footer'),
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res, view('404') , 404);
    }
}