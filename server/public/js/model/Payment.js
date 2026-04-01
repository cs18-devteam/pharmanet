import { swal } from "../view/swal.js";
import { createTransaction } from "./pharmacy/fetchTransactionsData.js";

class Payment{
    static payhere = undefined;
    static isPayhereLoaded = false;
    static url = "https://www.payhere.lk/lib/payhere.js";
    static sandbox = true;
    static merchant_id = undefined;



    /**
     * 
     * unique payment details
     */

    order_id = undefined;
    items = undefined;
    amount = undefined;
    currency = "LKR";
    hash = undefined;
    first_name = undefined;
    last_name = undefined;
    email = undefined;
    phone = undefined;
    address = undefined;
    city = undefined;
    country = undefined;
    delivery_address = undefined;
    delivery_city = undefined;
    delivery_country = undefined;
    return_url = undefined;
    cancel_url = undefined;
    notify_url = undefined;
    custom_1 = ""
    custom_2 = ""
    merchant_id = undefined;
    static #currentPayment = undefined;
    static #registerOnCompleteFunction = (data)=>{};


    constructor({
        orderId , 
        items,
        amount , 
        currency = "LKR" , 
        first_name , 
        last_name , 
        email , 
        phone , 
        address , 
        city , 
        country , 
        delivery_address,
        delivery_city , 
        delivery_country , 
        return_url , 
        cancel_url , 
        custom_1 ="" , 
        custom_2 ="", 
    }){
        if(!orderId) throw new Error("order_id must be defined");
        this.order_id = orderId;

        if(!amount) throw new Error("amount must be defined");
        this.amount = amount;

        this.items = (items instanceof Array) ? items.join(' ') : items;
        this.currency = currency;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.country = country;
        this.delivery_address = delivery_address;
        this.delivery_city = delivery_city;
        this.delivery_country = delivery_country;
        this.return_url = return_url;
        this.cancel_url = cancel_url;
        this.custom_1 = custom_1;
        this.custom_2 = custom_2;

    }


    async init(){
        const {hash , merchant_id} = await this.#getHash();
        this.merchant_id = merchant_id;
        this.hash = hash;
    }





    static getPayhere(){
        if(this.isPayhereLoaded) return this.payhere;
        const script = document.createElement('script');
        script.src = this.url;
        document.body.insertAdjacentElement('afterbegin',script);
        return new Promise((resolve , reject)=>{
            script.addEventListener('load' , ()=>{
                this.isPayhereLoaded = true;
                this.payhere = payhere;

                this.payhere.onDismissed = this.#onDismissed;
                this.payhere.onCompleted = this.#onCompleted;
                this.payhere.onError = this.#onError;
        
                resolve(this.payhere)
            });
        })
    }

    static async create({
        orderId , 
        items,
        amount , 
        currency, 
        first_name , 
        last_name , 
        email , 
        phone , 
        address , 
        city , 
        country , 
        delivery_address,
        delivery_city , 
        delivery_country , 
        return_url , 
        cancel_url , 
        custom_1, 
        custom_2,
    }){
        const payhere = await this.getPayhere();
        const payment = new Payment({
            orderId , 
            items,
            amount , 
            currency, 
            first_name , 
            last_name , 
            email , 
            phone , 
            address , 
            city , 
            country , 
            delivery_address,
            delivery_city , 
            delivery_country , 
            return_url , 
            cancel_url , 
            custom_1, 
            custom_2, 
        });

        await payment.init()

        return payment;
    }


    async #getHash(){
        const response = await fetch("/payments/hash" , {
            method :"POST",
            body :JSON.stringify({
                orderId : this.order_id,
                amount : this.amount,
            })
        });

        const data = await response.json();
        if(data.status == "success"){
            return {
                hash :data.hash , 
                merchant_id : data.merchant_id,
            };
        }else{
            throw new Error("hash not generated");
        }
    }

    static async #onCompleted(orderId){
        try{

            console.log(orderId);
            console.log(Payment.#currentPayment)
            
            const res = await createTransaction({
                orderId : orderId , 
                total : Payment.#currentPayment.amount,
                transactionId : null,
            })

            console.log(res);

            if(res.status == "error") throw new Error("transaction not complete");

            if(res.status == "success") {
                swal({
                    title:"Order Complete",
                    icon:"success",
                })
            }


        }catch(e){
            console.log(e);
            swal({
                title:"transaction not complete",
                text: "order created but transaction not complete",
                icon:'warning',
            })
        }

    }

    static #onDismissed(data){
        console.log('payment dismissed');
    }

    static #onError(error){
        console.log('on error')
    }


    static registerOnCompleteHandler(func=(data)=>{}){
        this.#registerOnCompleteFunction = func;
    }
    /**
     * 
     * @param {Payment} payment 
     */
    static #startPayment(payment){
        this.payhere.startPayment({
            "sandbox": this.sandbox,
            "merchant_id": String(payment.merchant_id),    // Replace your Merchant ID
            "return_url": payment.return_url,     // Important
            "cancel_url": payment.cancel_url,     // Important
            "notify_url": payment.notify_url,
            "order_id":String(payment.order_id),
            "items": payment.items,
            "amount": payment.amount,
            "currency": payment.currency,
            "hash": payment.hash, // *Replace with generated hash retrieved from backend
            "first_name": payment.first_name,
            "last_name": payment.last_name,
            "email": payment.email,
            "phone": payment.phone,
            "address": payment.address,
            "city": payment.city,
            "country":payment.country,
            "delivery_address":payment.delivery_address,
            "delivery_city": payment.delivery_city,
            "delivery_country": payment.delivery_country,
            "custom_1": payment.custom_1,
            "custom_2": payment.custom_2,
        })

    }

    async makePayment(){
        Payment.#currentPayment = this;
        return Payment.#startPayment(this);
    }
}



export default Payment;