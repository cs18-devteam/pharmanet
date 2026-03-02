const { decrypt } = require("../common/encrypt");
const readCookies = require("../common/readCookies");
const { response } = require("../common/response");
const view = require("../common/view");
const Users = require("../models/UserModel");


// exports.authenticate = (userId)=>{
//     return async (req , res , next)=>{
//         try{

//             const [user] =await Users.getById(req[userId]);
//             const cookies = readCookies(req);
//             const token = decrypt(cookies.token);

//             console.log(token);
//             if(!token) throw new Error("no token found on user " + id);
            
//             if(user.id == token.id && user.email == token.email ){
//                 req.user = user;
//                 return next();
//             }
            
//             return response(res ,view("login",{
//                 header : view('component.header' , {
//                         name:"Login || Pharmanet Pharmacy Management",
//                     }
//                 )
//             }) , 408);
            
            
            
//         }catch(e){
//             console.log(e);
//             return response(res, view("login",{
//                 header : view('component.header' , {
//                         name:"Login || Pharmanet Pharmacy Management",
//                     }
//                 )
//             }));
//         }
        
//     }
// }


exports.authenticate = (userId ,roles=['*'] ,permissions = ['*'])=>{
    return async (req , res , next)=>{
        try{

            const id = req[userId];
            if(!id) throw new Error("no user id found");
            const [user] =await Users.getById(id);

            if(!user) throw new Error("no user found for user id " + id);

            const cookies = readCookies(req);
            const token = JSON.parse(decrypt(cookies.token));
            
            if(user.id == token.id && user.email == token.email ){
                if(permissions.includes("*")){
                    return next();
                }
            }



            
            
            return response(res ,view("login",{
                header : view('component.header' , {
                        name:"Login || Pharmanet Pharmacy Management",
                    }
                )
            }) , 302 , {
                location :"/login"
            });
            
            
            
        }catch(e){
            console.log(e);
            return response(res, view("login",{
                header : view('component.header' , {
                        name:"Login || Pharmanet Pharmacy Management",
                    }
                )
            }) , 302 , {
                location : "/login"
            });
        }
        
    }
}

exports.grantAccess = (...roles)=>{
    return async (req , res , next)=>{
        if(!req.user) throw new Error('need run authenticate middleware first for use grant access ')
        console.log(roles);
        return next();
    }
}








