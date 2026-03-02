// const Users = require("../../models/UserModel");
// const { decrypt } = require("../encrypt");
// const { response } = require("../response");
// const view = require("../view");


// exports.authenticate = (userId ,roles=['*'] ,permissions = ['*'])=>{
//     return async (req , res , next)=>{
//         try{

//             const id = req[userId];
//             if(!id) throw new Error("no user id found");
//             const [user] =await Users.getById(id);

//             if(!user) throw new Error("no user found for user id " + id);

//             const cookies = readCookies(req);
//             const token = JSON.parse(decrypt(cookies.token));
            
//             if(user.id == token.id && user.email == token.email ){
//                 if(permissions.includes("*")){
//                     return next();
//                 }
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



// exports.grantAccess = (...roles)=>{
//     return async (req , res , next)=>{
//         console.log(roles);
//         return next();
//     }
// }




