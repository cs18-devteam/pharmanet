const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerTransaction = async (req , res)=>{
    try{

        return response(res , view("customer.transactions.transaction" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            footer: view('footer'),
            cart : view('customer/component.cart'),
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}


