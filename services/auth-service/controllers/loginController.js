const AuthModel = require("../models/AuthModel");

exports.login = async (req , res)=>{
    const header = req.headers;
    const cookies = {
        token:undefined,
        userid : undefined
    }
    header.cookie.split("; ").forEach(el=>{
        const [name , value] = el.split('=');
        cookies[name.toLowerCase()] = value;
    });
    console.log(cookies.token , cookies.userid);

    AuthModel.verifyCookieToken(cookies.userid , cookies.token);

    res.end()
}