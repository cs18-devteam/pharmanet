const crypto = require("crypto");
const Users = require("../../user-service/models/UserModel");


class AuthModel {
    static #sign = crypto.createSign('SHA256');

    static #createHash(id , userName){
        const { privateKey, publicKey } = 
        generateKeyPairSync('rsa', {
            modulusLength: 128,
        });

        const cookie = `uid=${id};userName=${userName};${process.env.HASH_SECRETE}`; 
        const token = this.#sign.update(cookie).digest('hex');

        return {token , publicKey , privateKey};
    }

    static async #verifyHash(id , token){
        const user = await Users.getById(id);
        const confirmToken = this.#createHash(user.id,user.userName);
        console.log(token );
        console.log( confirmToken);
        return token == confirmToken;
        
    }


    static CreateCookieToken({id , userName}){
        const encryptedHash = this.#createHash(id , userName)
        const token = `${encryptedHash.token};  Max-Age=${Number(process.env.LOGIN_PERIOD_IN_MILLISECONDS)}; HttpOnly; path=/`;
        return {
            token,
            publicKey:encryptedHash.publicKey,
            privateKey:encryptedHash.privateKey
        };
    }

    static async verifyCookieToken(userId,token){
        const reCreatedToken = await this.#verifyHash(userId , token);
        console.log(token , reCreatedToken);

        return 
    }
}


module.exports = AuthModel;