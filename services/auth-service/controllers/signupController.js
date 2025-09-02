const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../../user-service/helpers/UserTypes");
const UserFactory = require("../../user-service/models/UserFactory");
const crypto = require("node:crypto");

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
        console.log(formData);
        
        

        //create cookies
        const cookie = `uid=${newUser.id},userName=${newUser.userName}`; 
        const hash = crypto.createHash('sha256');
        const encryptedCookie = hash.update(cookie).digest('hex');

        const token = `${encryptedCookie}; expires=${(new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toUTCString())} UTC; HttpOnly; path=/`;
        res.writeHead(301,{
            "Authorization": `Bearer ${token}` ,
            "Content-Type":"application/json",
            "Set-Cookie":`Token= ${token}`,
            "Location": `/index.html`
        })
        newUser.token = token;

        res.end();
    })
    
}