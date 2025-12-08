const { response } = require("../common/response");
const view = require("../common/view");


exports.renderContactus = async (req , res)=>{
    try{

        return response(res , view("contactus" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            footer: view('footer'),
        }) , 200);
    }catch(e){
        return response(res , view('404') , 404);
    }
}

exports.renderAboutUs = async (req , res)=>{
    try{

        return response(res , view("aboutus" , {
            header : view('component.header' , {
                name:"Who are We ? || Pharmanet",
            }),
            footer: view('footer'),
        }) , 200);
    }catch(e){
        return response(res , view('404') , 404);
    }
}