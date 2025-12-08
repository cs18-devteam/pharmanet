const { response } = require("../../common/response");
const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const view = require("../../common/view");

exports.getStaffProfile = async (req , res)=>{
    try{

        
        if(data){
            return view('customer.home' , {
                header : view('component.header' , {
                    name:"Antibiotics",
                }),
                navbar: view('components/navbar' , {
                    id: data.id,
                    name : `${data.firstName} ${data.lastName}`
                }),
                footer: view('footer'),})
        }
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}


