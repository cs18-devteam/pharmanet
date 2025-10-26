const AuthModel = require("../models/AuthModel");

exports.login = async (req , res)=>{
    const header = req.headers;
    const cookies = {
        Token:undefined,
        UserId : undefined,
        publicKey : undefined,
    }
    header.cookie.split("; ").forEach(el=>{
        const [name , value] = el.split('=');
        cookies[name] = value;
    });
    console.log(cookies.Token , cookies.UserId);

    AuthModel.verifyCookieToken({
        id : cookies.UserId , 
        key : cookies.publicKey , 
        token : cookies.Token,
        
    });

    res.end()
}