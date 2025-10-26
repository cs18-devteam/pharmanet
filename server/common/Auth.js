const crypto = require("crypto");
const fs = require('fs');
const { getRequestData } = require("./getRequestData");
const Users = require("../models/UserModel");

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



const algorithm = "aes-256-cbc";
// const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes for AES-256
// const IV = crypto.randomBytes(16); // 16 bytes for AES block size
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPT_KEY , 'hex');
const IV = Buffer.from(process.env.IV , 'hex');


// fs.writeFileSync('./encrypt.key' , ENCRYPTION_KEY.toString('hex'));
// fs.writeFileSync('./iv.iv' , IV.toString('hex'));

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: IV.toString("hex"),
    content: encrypted,
  };
}

exports.decrypt = (encrypted) => {
    try{

        const decipher = crypto.createDecipheriv(
            algorithm,
            ENCRYPTION_KEY,
            IV,
        );
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }catch(e){
        return {};
    }
}

exports.createToken = (user)=>{
        const token = this.encrypt(JSON.stringify({
            email:user.email,
            id : user.id
        }))
        return token.content;

    }
    
exports.createCookie = (token)=>{
    const cookie = `token=${token};expires=${Date.now() + 300};path=/;`
    return cookie;

}


exports.readCookies =(req)=> {
  const cookieHeader = req.headers.cookie; // raw cookie string
  if (!cookieHeader) return {};

  const cookies = {};
  const cookiePairs = cookieHeader.split(";");

  for (const pair of cookiePairs) {
    const [key, value] = pair.trim().split("=");
    cookies[key] = decodeURIComponent(value);
  }

  return cookies;
}




exports.verifyUser =async (req , res , id)=>{
    try{

        // const cookies = this.readCookies(req);
        const cookies = JSON.parse(await getRequestData(req));
        const token = cookies.token;
        const decodedToken = JSON.parse(this.decrypt(token));
        if(id == decodedToken.id){
            const user = (await Users.getById(id))[0];
            return decodedToken.email == user.email;
        }
    }catch(e){
        console.log(e);
    }
    return false;
    
}