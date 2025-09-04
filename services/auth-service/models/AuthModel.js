const crypto = require("crypto");
const Users = require("../../user-service/models/UserModel");
const fs = require('fs');
const path = require("path");

const publicKey = fs.readFileSync("./publickey.pem" ,'utf-8');
const privateKey = fs.readFileSync("./privatekey.pem" ,'utf-8');


class AuthModel {
    constructor(){
        AuthModel.#createKeys();
    }



    static #createKeys(){
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });

        fs.writeFileSync('./publickey.pem' , publicKey.export({
            type:"pkcs1",
            format:"pem"
        }));

        console.log("publickey created and save to :" + path.join(__dirname , "/publickey.pem"));

        fs.writeFileSync('./privateKey.pem' , privateKey.export({
            type:"pkcs1",
            format:"pem"
        }));

        console.log("privatekey created and save to :" + path.join(__dirname , "/privatekey.pem"));
    }


    
    static #createHash(id , userName){
        const sign = crypto.createSign('SHA256');
        
        const cookie = `uid=${id};userName=${userName};${process.env.HASH_SECRETE}`; 
        sign.update(cookie);
        const token = sign.sign(privateKey);

        return {
            token: token.toString('hex') , 
        };
    }

    static async #verifyHash({id , token}){
        const verify = crypto.createVerify('SHA256');
        const user =await Users.getById(id);
        const cookie = `uid=${user.id};userName=${user.userName};${process.env.HASH_SECRETE}`; 

        verify.update(cookie);

        const verified = verify.verify(publicKey , token , 'hex' );
        
        console.log({ token , publicKey ,verified} );
        return verified;
        
    }


    static encrypt(text){
        const encryptText = crypto.publicEncrypt(publicKey , Buffer.from(text , "utf-8"));
        return encryptText.toString('hex');

    }

    static aseEncrypt(text){
        // const iv = crypto.randomBytes(Number(process.env.IV_LENGTH));
        // const cipher = crypto.createCipheriv('aes-256-cbc' , publicKey , iv);
        // console.log(cipher);
    }


    static decrypt(text){
        const decode = crypto.privateDecrypt(privateKey , Buffer.from(text , 'hex'));
        const data = decode.toString('utf-8');
        return data;
    }


    static CreateCookieToken({id , userName}){
        const encryptedHash = this.#createHash(id , userName)
        const token = `${encryptedHash.token};  Max-Age=${Number(process.env.LOGIN_PERIOD_IN_MILLISECONDS)}; HttpOnly; path=/`;
        

        return {
            token,
        };
    }

    static async verifyCookieToken({id , key , token}){
        const isVerified = await this.#verifyHash({id , key , token});
        console.log({isVerified});

        return 
    }
}


module.exports = AuthModel;

exports.createAuthKeys = ()=>{
    new AuthModel();
}