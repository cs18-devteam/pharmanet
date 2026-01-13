const crypto = require("crypto");
const fs = require('fs');
const { getRequestData } = require("./getRequestData");
const Users = require("../models/UserModel");
const { encrypt } = require("./encrypt");

exports.hashPassword = (password)=> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

exports.verifyPassword = (password, storedHash)=> {
  const [salt, originalHash] = storedHash.split(":");
  const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hashToVerify === originalHash;
}





// fs.writeFileSync('./encrypt.key' , ENCRYPTION_KEY.toString('hex'));
// fs.writeFileSync('./iv.iv' , IV.toString('hex'));



exports.createToken = (user)=>{
        const token = encrypt(JSON.stringify({
            email:user.email,
            id : user.id
        }))
        return token.content;

    }
    
exports.createCookie = (token)=>{
    const cookie = `token=${token};expires=${Date.now() + 300};path=/;`
    return cookie;

}






exports.verifyUser =async (req , res , id)=>{
    try{

        const cookies = this.readCookies(req);
        // const cookies = JSON.parse(await getRequestData(req));
        const token = cookies.token;
        if(!token) return false; 
        const decodedToken = JSON.parse(this.decrypt(token));
        if(!decodedToken.id) return false;

        if(id == decodedToken.id){
            const user = (await Users.getById(id))[0];
            return decodedToken.email == user.email;
        }
    }catch(e){
        console.log(e);
    }
    return false;
    
}