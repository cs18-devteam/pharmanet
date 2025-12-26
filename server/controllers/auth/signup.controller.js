

// --- Authenticate user (Login) ---
const { hashPassword, encrypt, createToken, createCookie : createCookieToken} = require("../../common/Auth");
const { createCookie } = require("../../common/cookie");
const generateOTP = require("../../common/generateOTP");
const { getRequestData } = require("../../common/getRequestData");
const ipaddress = require("../../common/ipaddress");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");
const otpController = require("./sendOTP.controller");

exports.renderSignup = async (req, res) => {
    return response(res, view("signup" , {
        header : view('component.header' , {
            name:"Signup || Pharmacy Management System",
        })
    }), 200);
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
            dateOfBirth : new Date(dateOfBirth).toISOString().slice(0, 19).replace('T', ' ') , 
            addressNo : addressNo || "unknown" , 
            street : street || "unknown" , 
            town : town || "unknown" ,
            province : province || "unknown", 
            postalCode : postalCode,
            role : role || "customer",
            emailOTP : generateOTP(),
            emailOTPCreatedAt : new Date(Date.now()).toISOString().slice(0, 19).replace("T", " "), //5 min
            verified: 0,
        });

        const token = createToken(newUser[0]);
        const cookie = createCookieToken(token);
        // console.log(newUser);
        otpController.sendEmailOTP(newUser[0]);
        


        return responseJson(res , 201 , {
                status:"success",
                results : {...newUser,
                    password:undefined ,
                    emailOTP :undefined , 
                    emailOTPCreatedAt : undefined,
                },
            message :"user account created successfully",
            token : token,
        } , {
            "Set-Cookie" : [cookie , createCookie('id' , newUser.id) , createCookie('ip' , ipaddress)],
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




