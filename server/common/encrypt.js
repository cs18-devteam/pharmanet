const crypto = require("crypto");
const fs = require('fs');
const Bridge = require("./Bridge");
// const bcrypt = require("crypto");
const saltRounds = 10;

// You can store this key and IV securely (e.g., in env variables)
const algorithm = "aes-256-cbc";
// const secretKey = crypto.randomBytes(32); // 32 bytes for AES-256
// const iv = crypto.randomBytes(16); 
// fs.writeFileSync('./iv.key' , iv.toString("hex"));
const ENCRYPT_KEY = Buffer.from(process.env.ENCRYPT_KEY, "hex");
const IV = Buffer.from(process.env.IV, "hex");

exports.encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, ENCRYPT_KEY , IV);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
        iv: IV.toString("hex"),
        content: encrypted,
        key: ENCRYPT_KEY
    };
}


exports.hashPassword =(password)=> {
    return crypto.createHash("sha256").update(password).digest("hex");
}

exports.decrypt = (encryptedData) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(ENCRYPT_KEY, "hex"),
        Buffer.from(IV, "hex")
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}


exports.verifyPassword = (password , storedPassword)=>{
    return password == storedPassword; 
}


exports.authenticate =async (req , res)=>{
    // const token =  req.headers.cookie('token');
    const cookies = {};
    const cookieHeader = req.headers.cookie;
    cookieHeader.split(";").forEach(cookie => {
        const [name, value] = cookie.split("=").map(c => c.trim());
        cookies[name] = value;
    });

    const token = cookies.token;
    if(!token) return false;
    const data = JSON.parse(this.decrypt(token));
    const respond = await fetch(`${Bridge.registry.USER_SERVICE}?id=${data.id}`);
    const results = await respond.json();
    const user = results.data[0];
    if(!user) return false;        

}



exports.hashPassword = (password)=> {
    // return await bcrypt.hash(password, saltRounds);
    return crypto.createHash("sha256").update(password).digest("hex");

}

// exports.comparePasswords = async (hash,  storedHash) =>{
//     return await bcrypt.compare(hash, storedHash);
// }


exports.createToken = (user)=>{
    const {content : token} = this.encrypt(JSON.stringify({id : user.id , password : user.password}))
    return token; 


}
