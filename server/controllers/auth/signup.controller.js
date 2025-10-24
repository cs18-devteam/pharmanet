// const Bridge = require("../common/Bridge");
// const { getRequestData } = require("../common/getRequestData");
// const { response } = require("../common/response");
// const view = require("../common/view");

// exports.renderSignup = async (req , res)=>{
//     return response(res , view('signup') , 200);
// }


// exports.createUser = async (req , res)=>{
//     Bridge.pipe(req , res)
//     .connect(Bridge.registry.CUSTOMER_SERVICE , {
//         method : "POST",

//     }).request(async (req , res)=>{
//         const userData = await getRequestData(req);
//         return userData;
//     }).json()
//     .resend((data)=>{
//         if(data){
//             return view('customer.home' , {
//                 navbar: view('components/navbar' , {
//                     id: data.id,
//                     name : `${data.firstName} ${data.lastName}`
//                 })
//             }  , {
//                 id: data.id,
//             });

//         }

//         return JSON.stringify({
//             status : "error",
//             message : "Invalid details",
//         })

//     });
// }


// --- Authenticate user (Login) ---
const Bridge = require("../../common/Bridge");
const customerFetch = require("../../common/controllers/customerFetch");
const { createToken, hashPassword } = require("../../common/encrypt");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");

exports.renderSignup = async (req, res) => {
    return response(res, view("signup"), 200);
};

exports.createUser = async (req, res) => {
    try{

    let token = undefined;
    const userData = await getRequestData(req);
    const { firstName, lastName, email, password , birthDay } = JSON.parse(userData);
    const hashed = hashPassword(password);

    const respond = await fetch(Bridge.registry.CUSTOMER_SERVICE ,{
        method:"POST",
        body:JSON.stringify({
                firstName , 
                lastName , 
                email , 
                password : hashed , 
                birthDay,
            })
    });
    const results = await respond.json();
    console.log(results);
    if(results?.data?.[0]?.id){
        const newCustomer = results.data[0];

        token = createToken(newCustomer);

        const body = JSON.stringify({
                status:"success",
                data : newCustomer,
                count:1,
                token,
            });


        const headers = {
            "Authorization" : token , 
            "Set-Cookie" : `token=${token};path=/;expires=${Date.now()/1000 * 5}`
        }

        return response(res , body , 201 , headers );


    }else{
        return responseJson(res , 400 , {
            "status":"error"
        } )
    }
    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error"
        })
    }


};

