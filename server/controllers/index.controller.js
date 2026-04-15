const { decrypt } = require("../common/encrypt");
const readCookies = require("../common/readCookies");
const { response } = require("../common/response")
const view = require("../common/view");
const Medicines = require("../models/MedicineModel");
const Pharmacies = require("../models/PharmacyModel");
const Users = require("../models/UserModel");

exports.renderIndexPage =  async (req , res)=>{
    try{
                        
    
        const {token} = readCookies(req);
    
        console.log(token);
        if(token){
            
            let redirectURL = undefined;
            const tokenData = JSON.parse(decrypt(token));
            if(tokenData?.id){
                
                const [user] = await Users.getById(tokenData.id);
                console.log(user);
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

        const [{count : medicineCount}] = await Medicines.query('select count(*) as count from this.table');
        const [{count : pharmacyCount}] = await Pharmacies.query('select count(*) as count from this.table');
        
        
        // if(cookies.token) return response(res , "redirect to home page" , )


        return response(res , view('index' , {
                header : view('component.header' , {
                    name:"Pharmanet || Welcome to pharmanet",
                }),
                navbar : view('components/navbar.user'),
                footer: view('footer'),
                verified:"",
                MedicineCount : medicineCount ,
                PharmacyCount: pharmacyCount,
            }) , 200);
    }catch(e){
        console.log(e);
        return response(res, view('404') , 404);
    }
}




