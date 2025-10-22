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
const Bridge = require("../common/Bridge");
const customerFetch = require("../common/controllers/customerFetch");
const { createToken, hashPassword } = require("../common/encrypt");
const { getRequestData } = require("../common/getRequestData");
const { response } = require("../common/response");
const view = require("../common/view");

exports.renderSignup = async (req, res) => {
    return response(res, view("signup"), 200);
};

exports.createUser = async (req, res) => {
    let token = undefined;

    Bridge.pipe(req, res)
        .connect(Bridge.registry.CUSTOMER_SERVICE, {
            method: "POST",
        })
        .request(async (req , res) => {
            const userData = await getRequestData(req);
            const { firstName, lastName, email, password , birthDay } = JSON.parse(userData);
            const hashed = hashPassword(password);
            

            return JSON.stringify({
                firstName , 
                lastName , 
                email , 
                password : hashed , 
                birthDay,
            });
        })
        .json()
        .resend((data) => {
            customer = data.data[0];


            if(!customer) return view('404');

            token = createToken(users);

            return JSON.stringify({
                status:"success",
                data : customer,
                count : 1,
            })

        } , 200 , {
            "Authorization" : token , 
            "Set-Cookie" : `token=${token};path=/;expires=${Date.now()/1000 * 5}`
        }).catch(e=>{
            console.log(e);
        })
};

