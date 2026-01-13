import Payment from "/js/model/Payment.js";


async function payment(){
    const payment =await Payment.create({
        orderId : 12345,
        amount: 1000,
        first_name : 'chathura',
        last_name : 'priyashan',
        email : "chathura15592priyashan@gmail.com",
        items:"hellow world",
        phone :"0762053288", 
        address  :"c60 nilmalgoda", 
        city :'kegalle', 
        country :"sri lanka" , 
        delivery_address :"delivery",
        delivery_city :"kegalle" , 
        delivery_country  :"sri lanka", 
    });
    payment.makePayment();
}


document.getElementById("payhere-payment").addEventListener("click" , payment);



