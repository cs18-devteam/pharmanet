
const {  verifyPassword, createCookie : createCookieToken, createToken } = require("../../common/Auth");
const Bridge = require("../../common/Bridge");
const { createCookie } = require("../../common/cookie");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");



// Render login page
exports.renderLogin = async (req, res) => {
    return response(res, view("login",{
        header : view('component.header' , {
          name:"Login || Pharmanet Pharmacy Management",
        })
    }), 200);
};

// Login function
exports.login = async (req, res) => {
    try{
        const {email , password} = JSON.parse(await getRequestData(req));

        if(!email || !password){
            return responseJson(res , 400 , {
                status:"error",
                message : "email or password invalid",
            });
        }

        const user = await Users.get({
            email : email,
        });

        if(!user[0]){
            return responseJson(res , 400 , {
                status:"error",
                message :"invalid email address",
            })
        }
        const isVerified = verifyPassword(password , user[0].password);

        console.log({password , stored : user[0].password})
        console.log(isVerified);
        if(!isVerified){
            return responseJson(res , 400 , {
                status:"error",
                message :"email or password invalid",
            })
        }

        const token = createToken(user[0]);
        const cookie = createCookieToken(token);


        console.log(cookie)

        return responseJson(res , 200 , {
            status:"success",
            token : token ,
            user : {...user[0] , password : undefined}
        } , {
            "Set-Cookie" : [cookie , createCookie('id' , user[0].id) ]
        })

    } catch (err) {
        console.error("Login error:", err);
        return responseJson(res, 500 ,{ status: "error", message: "Internal server error" });
    }
};
