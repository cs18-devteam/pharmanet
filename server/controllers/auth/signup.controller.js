

// --- Authenticate user (Login) ---
const { hashPassword, encrypt, createToken, createCookie } = require("../../common/Auth");
const Bridge = require("../../common/Bridge");
const catchAsync = require("../../common/catchAsync");
const customerFetch = require("../../common/controllers/customerFetch");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");

exports.renderSignup = async (req, res) => {
    return response(res, view("signup"), 200);
};

exports.signup = async (req, res) => {

    try{


        const {email , password , firstName , lastName , nic , fullName , dateOfBirth  , addressNo , street , town , province , postalCode  , role} = JSON.parse(await getRequestData(req));

        console.log({email , password , firstName , lastName , nic , fullName , dateOfBirth  , addressNo , street , town , province , postalCode , role })
        
        //check for duplicate email
        const emailUser = await Users.get({
            email : email
        });
        
        if(emailUser[0]){
            return responseJson(res , 400 , {
                status :'error',
                message :"Email already in use",
                field:'email'
            })
        }
        
        //check for duplicate nic
        const nicUser = await Users.get(nic);
        if(nicUser[0]){
            return responseJson(res , 400 , {
                status :"error",
                message : "Nic is already used",
                field: 'nic',
            })
        }
        
        if(!password || !email){
            return responseJson(res , 400 , {
                status:'error',
                message :"email or password invalid",
                data : {
                    email , 
                    password , 
                    firstName , 
                    lastName , 
                    addressNo , 
                    nic,
                    fullName , 
                    dateOfBirth , 
                    town , 
                    province , 
                    postalCode,
                    role,
                }
            })
        }

        
        const newUser = await Users.save({
            email : email  || "" , 
            password  : hashPassword(password), 
            firstName : firstName || "", 
            lastName  : lastName || "",
            nic : nic || "unknown", 
            fullName : fullName || "unknown" , 
            dateOfBirth : dateOfBirth , 
            addressNo : addressNo || "unknown" , 
            street : street || "unknown" , 
            town : street || "unknown" ,
            province : province || "unknown", 
            postalCode : postalCode,
            role : role || "customer"
        });

        const token = createToken(newUser);
        const cookie = createCookie(token);

        return responseJson(res , 201 , {
            status:"success",
            results : { ...newUser , password : undefined },
            message :"user account created successfully",
            token : token,
        } , {
            "Set-Cookie" : cookie
        })

    }catch(e){
        console.log(e);
        return responseJson(res , 500 , {
            status:"error",
            message :"internal server error",
            error :e,
        })
    }
        


};




