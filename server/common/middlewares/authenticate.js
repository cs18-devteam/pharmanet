const Users = require("../../models/UserModel");
const { decrypt } = require("../encrypt");
const { response } = require("../response");
const view = require("../view");


exports.authenticate = (userId)=>{
    return async (req , res , next)=>{
        try{

            const [user] =await Users.getById(req[userId]);
            const cookies = readCookies(req);
            const token = JSON.parse(decrypt(cookies.token));
            
            if(user.id == token.id && user.email == token.email ){
                return next();
            }
            
            return response(res ,view("login",{
                header : view('component.header' , {
                        name:"Login || Pharmanet Pharmacy Management",
                    }
                )
            }) , 408);
            
            
            
        }catch(e){
            console.log(e);
            return response(res, view("login",{
                header : view('component.header' , {
                        name:"Login || Pharmanet Pharmacy Management",
                    }
                )
            }));
        }
        
    }
}



exports.grantAccess = (...roles)=>{
    return async (req , res , next)=>{
        console.log(roles);
        return next();
    }
}




