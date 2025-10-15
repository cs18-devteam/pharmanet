const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../../user-service/helpers/UserTypes");
const UserFactory = require("../../user-service/models/UserFactory");
const AuthModel = require("../models/AuthModel");
const Users = require("../../user-service/models/UserModel");

exports.signup = async (req , res)=>{
    let data = "";
    const formData = {}

    req.on('data' , chunk=> data += chunk);
    req.on('end' ,async ()=>{

        data.split("&").forEach(dt=>{
            const [name , value] = dt.split("=");
            formData[name] = value;
        })



        const newUser = await UserFactory.createUser(UserTypes.CUSTOMER , formData);
        
        const token = AuthModel.CreateCookieToken({
            id: newUser.id,
            userName : newUser.userName,
        })

        console.log(token.publicKey.length);

        await Users.update({
            id: newUser.id,
            publicKey : token.publicKey,
            privateKey : token.privateKey,
        })
        
        res.setHeader("Set-Cookie" , [
            `Token= ${token} path=/`,
            `UserId= ${newUser.id}; Max-Age=${Number(process.env.LOGIN_PERIOD_IN_MILLISECONDS)} path=/`,
            `key= ${token.publicKey} httpOnly; path=/`
        ])

        console.log(res);

        res.writeHead(301,{
            "Authorization": `Bearer ${token}` ,
            "Content-Type":"application/json",
            "Location": `/index.html`,
        })
        newUser.token = token;

        res.end();
    })
    
}

const results = AuthModel.encrypt("hello i am chathura");
const data = AuthModel.decrypt(results)