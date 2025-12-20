const readCookies = require("../common/readCookies");
const { response } = require("../common/response");
const view = require("../common/view");
const Users = require("../models/UserModel");


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
        const {id} = readCookies(req);
        const [customer] = await Users.getById(id);
        

        return response(res , view("aboutus" , {
            header : view('component.header' , {
                name:"Who are We ? || Pharmanet",
            }),
            footer: view('footer'),
            navbar: customer ? view('customer/navbar.customer' , customer) : view('components/navbar.user'),
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}