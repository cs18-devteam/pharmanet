
const crypto = require('crypto');
const algorithm = "aes-256-cbc";
// const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes for AES-256
// const IV = crypto.randomBytes(16); // 16 bytes for AES block size
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPT_KEY , 'hex');
const IV = Buffer.from(process.env.IV , 'hex');




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