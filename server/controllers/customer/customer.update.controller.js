const { response } = require("../common/response");
const view = require("../common/view");


exports.renderUpdateProfile = async (req , res)=>{
    try{

        return response(res , view("customer.update" , {
            header : view('component.header' , {
                name:"Antibiotics",
            })
        }) , 200);
    }catch(e){
        return response(res , view('404') , 404);
    }
}


