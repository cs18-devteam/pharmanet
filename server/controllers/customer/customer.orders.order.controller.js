const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerOrderDetails = async (req , res)=>{
    try{

        return response(res , view("customer.orders.order" , {
            header : view('component.header' , {
                name:"Antibiotics",
            })
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}