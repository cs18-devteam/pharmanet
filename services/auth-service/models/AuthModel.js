const crypto = require("crypto");
const UserModel = require("../../user-service/models/UserModel");
const Users = new UserModel();


class AuthModel {

    static #createHash(id , userName){
        const cookie = `uid=${id};userName=${userName};${process.env.HASH_SECRETE}`; 
        const hash = crypto.createHash('sha256');
        const encryptedHash = hash.update(cookie).digest('hex');
        return encryptedHash;
    }

    static async #verifyHash(id , token){
        const user = await Users.getById(id);
        const confirmToken = this.#createHash(user.id,user.userName);
        return token == confirmToken;
        
    }


    static CreateCookieToken({id , userName}){
        const encryptedHash = this.#createHash(id , userName)
        const token = `${encryptedHash};  Max-Age=${Number(process.env.LOGIN_PERIOD_IN_MILLISECONDS)}; HttpOnly; path=/`;
        return token;
    }

    static async verifyCookieToken(userId,token){
        return await this.#verifyHash(userId , token);
    }
}


module.exports = AuthModel;