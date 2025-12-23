import Payment from "../../model/Payment.js";
import Application from "../../model/application/Application.js";
import { createOrder } from "../../model/pharmacy/orders.js";
import { updateReceipt } from "../../view/pharmacy/orders/reciptView.js";
import { closeOrdersPaymentMode, openOrdersPaymentMode } from "../../view/pharmacy/orders__viewPaymentMode.js";
import { swal } from "../../view/swal.js";

const paymentForm = document.querySelector('.orders .payment-section form');
const createOrderCreateBtn = document.querySelector('.orders .footer-btn .create-order-btn');
const createOrderBackBtn = document.querySelector('.orders .footer-btn .back-btn');
const ordersPayButton = document.querySelector('.orders .pay_button');
const paymentMethodButtons = document.querySelector('.orders .select-payment-method .selection');
let paymentOption = undefined;


function updatePaymentMethodScreen(){

    let total = 0;
    const items = Application.getOrderItems().map(i=>{
        if(i.medicineId){
            const data = {};
            data.price = i.units * i.getMedicine().stock.price - i.discounts;
            data.quantity = i.units;
            data.name = i.getMedicine().geneticName;
            data.days = i.days;

            total += data.price;

            return data;
        };
    })


    updateReceipt({
        pharmacyName: Application.pharmacy?.name , 
        orderId:"------",
        items: items,
        total,
    })
}



function clearOrderDetails(){
    Application.clearOrderItems();
    closeOrdersPaymentMode();
}

// openOrdersPaymentMode();
//? orders payment section view and close functions
ordersPayButton?.addEventListener('click' , ()=>{
    if(Application.getOrderItems().length == 0) {
        swal({title : "please select items to proceed order"})
        return;
    };
    openOrdersPaymentMode();
    updatePaymentMethodScreen();
});

createOrderBackBtn?.addEventListener('click', closeOrdersPaymentMode);



createOrderCreateBtn?.addEventListener("click" ,async ()=>{
    const formData = new FormData(paymentForm);

    for(const [key , value] of formData.entries()){
        const input = paymentForm.querySelector(`[name="${key}"]`);

        // if(!value){
        //     input.classList.add("error");
        //     input.classList.remove("success");
        // }else{
        //     input.classList.remove("error");
        //     input.classList.add("success");
        // }
    }

    const items = Application.getOrderItems().map(item=>{
        return {
            itemType : item.medicineId ? "medicine" : "product",
            itemId : item.medicineId || item.productId,
            quantity : item.units,
        }
    })

    if(paymentOption == undefined){
        swal({title : "please select payment method"});
        return;
    };

    if(paymentOption == "cash"){
        
        const order = await createOrder({
            userId : -1 , 
            items ,
            
        })

        if(order.status == "success"){
            swal({
                title:"order created",
                icon:"success",
            })
        }else{
            swal({
                title:"order failed",
                icon :"error",
            })
        }
        console.log(order);




    }

    if(paymentOption == "card"){
        const payment = await Payment.create({
            orderId : 12345,
            amount: 1000,
            first_name : formData.get('f-name'),
            last_name : formData.get('l-name'),
            email : "---",
            items:"---",
            phone :"--", 
            address  :"--", 
            city :'', 
            country :"sri lanka" , 
            delivery_address :"",
            delivery_city :"" , 
            delivery_country  :"sri lanka", 
        });

        const results = await payment.makePayment();
        console.log(payment , results);
    }


    clearOrderDetails();

})

paymentMethodButtons?.addEventListener('click' , e=>{
    const target = e.target;
    const cardButton = target.closest('.card-btn');
    const cashButton = target.closest('.cash-btn');

    [cardButton , cashButton].forEach(el=>{
        if(!el) return;
        Array.from(paymentMethodButtons.children).forEach(el=>el.classList.remove('active'));
        el.classList.add('active');
        if(cardButton){
            paymentOption = "card";
        }else if(cashButton){
            paymentOption = "cash";
        }

    })
});


// // import Payment from "/js/model/Payment.js";


// async function payment(){
//     const payment =await Payment.create({
//         orderId : 12345,
//         amount: 1000,
//         first_name : 'chathura',
//         last_name : 'priyashan',
//         email : "chathura15592priyashan@gmail.com",
//         items:"hellow world",
//         phone :"0762053288", 
//         address  :"c60 nilmalgoda", 
//         city :'kegalle', 
//         country :"sri lanka" , 
//         delivery_address :"delivery",
//         delivery_city :"kegalle" , 
//         delivery_country  :"sri lanka", 
//     });
//     payment.makePayment();
// }


// document.getElementById("payhere-payment").addEventListener("click" , payment);

