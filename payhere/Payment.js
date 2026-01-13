const crypto = require('crypto');
const { response } = require('../common/response');
// const crypto = require('crypto-js');


class Payment{
    static #merchantId = process.env.MERCHANT_ID
    static #merchantSecret = process.env.MERCHANT_SECRET + "==";
    static #url=process.env.PAYMENT_GATEWAY_SANDBOX;

    static getMerchantId(){
        return this.#merchantId
    }

    static getMerchantSecret(){
        return this.#merchantSecret;
    }

    static createHash({orderId , amount ,currency = "LKR" }={}){
        const amountFormatted  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
        const hashedSecret = crypto.createHash('md5').update(this.#merchantSecret).digest('hex').toUpperCase();
        const hash = crypto.createHash('md5').update(this.#merchantId + orderId + amountFormatted + currency + hashedSecret).digest('hex').toUpperCase();

        return hash;
    }

}

module.exports = Payment;