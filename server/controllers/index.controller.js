const { decrypt } = require("../common/encrypt");
const readCookies = require("../common/readCookies");
const { response } = require("../common/response")
const view = require("../common/view");
const Medicines = require("../models/MedicineModel");
const Users = require("../models/UserModel");

exports.renderIndexPage =  async (req , res)=>{
    try{
                        
        const {token} = readCookies(req);
        if(token){
            
            let redirectURL = undefined;
            const tokenData = JSON.parse( decrypt(token));
            if(tokenData?.id){

                const [user] = await Users.getById(tokenData.id);
                if(user){
                    switch (user.role){
                        case "customer":
                            redirectURL = `/customers/${user.id}`;
                            break;
                        case "admin":
                            redirectURL = `/admin/${user.id}`;
                            break;
                        default:
                            redirectURL = "/login";
                    }


                    return response(res , "redirecting..." , 302 ,{
                        location : redirectURL,
                    })
                } 


            }
        }

        
        const medicine = await Medicines.query("select * from this.table limit 8 ");
        console.log(medicine)
        // if(cookies.token) return response(res , "redirect to home page" , )

        //Medicines.get({schedule: "II B"})

        return response(res , view('index' , {
                header : view('component.header' , {
                    name:"Pharmanet || Welcome to pharmanet",
                }),
                navbar : view('components/navbar.user'),
                footer: view('footer'), 
                card : medicine.map(m => view("customer/component.medicine.card", {
                    id: m.id,
                
                    image: m.image,
                    name: m.geneticName,
                    

                })).join(" ")
            }) , 200);
    }catch(e){
        console.log(e);
        return response(res, view('404') , 404);
    }
}




