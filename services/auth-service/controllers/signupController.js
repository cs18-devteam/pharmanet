const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../../user-service/helpers/UserTypes");
const UserFactory = require("../../user-service/models/UserFactory");
const crypto = require("node:crypto");
const AuthModel = require("../models/AuthModel");

exports.signup = async (req , res)=>{
    let data = "";
    const formData = {}

    req.on('data' , chunk=> data += chunk);
    req.on('end' ,async ()=>{

        data.split("&").forEach(dt=>{
            const [name , value] = dt.split("=");
            formData[name] = value;
        })

        const newUser =await UserFactory.createUser(UserTypes.CUSTOMER , formData);
        
        const token = AuthModel.CreateCookieToken({
            id: newUser.id,
            userName : newUser.userName,
        })
        
        res.setHeader("Set-Cookie" , [
            `Token= ${token}`,
            `userId= ${newUser.id}; Max-Age=${Number(process.env.LOGIN_PERIOD_IN_MILLISECONDS)}`,
        ])

        res.writeHead(301,{
            "Authorization": `Bearer ${token}` ,
            "Content-Type":"application/json",
            "Location": `/index.html`,
        })
        newUser.token = token;

        res.end();
    })
    
}