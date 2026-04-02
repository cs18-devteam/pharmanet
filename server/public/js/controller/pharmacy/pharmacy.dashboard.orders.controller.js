import Payment from "../../model/Payment.js";
import Application from "../../model/application/Application.js";
import { createOrder, deleteOrder, getOrdersList } from "../../model/pharmacy/orders.js";
import { closeDrawer, openDrawer, setDrawerContent } from "../../view/pharmacy/drawerView.js";
import { createOrderTable } from "../../view/pharmacy/orders/orderTableView.js";
import { orderView } from "../../view/pharmacy/orders/orderView.js";
import { updateReceipt } from "../../view/pharmacy/orders/reciptView.js";
import { closeOrdersPaymentMode, openOrdersPaymentMode } from "../../view/pharmacy/orders__viewPaymentMode.js";
import { swal } from "../../view/swal.js";
import orders__searchAndRenderMedicineCard, { updateCardList } from "./orders/orders__searchAndRenderMedicineCards.js";
const cartList = document.querySelector('.orders .cart_list');


export default function init(){
    updateCardList(cartList , Application.getOrderItems());
    orders__searchAndRenderMedicineCard();

    const ordersBtn = document.querySelector(".orders .right-btns .payment-btn");
    const searchBtn = document.querySelector(".orders .right-btns .search-btn");

    ordersBtn.addEventListener("click" , showOrders);
    searchBtn.addEventListener("click" , ()=>{closeDrawer()})



    
}


const paymentForm = document.querySelector('.orders .payment-section form');
const createOrderCreateBtn = document.querySelector('.orders .footer-btn .create-order-btn');
const createOrderBackBtn = document.querySelector('.orders .footer-btn .back-btn');
const ordersPayButton = document.querySelector('.orders .pay_button');
const paymentMethodButtons = document.querySelector('.orders .select-payment-method .selection');
let paymentOption = undefined;
const printBtn = document.querySelector(".orders .print-btn");


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
        }else{
            const data = {};
            data.price = i.units * i.getProduct().price - i.discounts;
            data.quantity = i.units;
            data.name = i.getProduct().name;
            data.days = 0;

            total += data.price;

            return data;
        }
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
    console.log(Application.getOrderItems());
    updateCardList(cartList , Application.getOrderItems());
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

    }

    const items = Application.getOrderItems().map(item=>{


        return {
            itemType : item.medicineId ? "medicine" : "product",
            itemId : item.medicineId || item.productId,
            quantity : item.units,
            discount: item.discounts || 0,
        }
    })

    if(paymentOption == undefined){
        swal({title : "please select payment method"});
        return;
    };

    if(paymentOption == "cash"){
        
        const order = await createOrder({
            staffId : Application.staffId ,
            pharmacyId : Application.pharmacyId, 
            items ,
            paymentMethod:"cash",
            
        })

        if(order.status == "success"){
            swal({
                title:"order created",
                icon:"success",
                timer: 800,
                showConfirmButton: false,
            });

            showOrders();

        }else{
            swal({
                title:"order failed",
                icon :"error",
            })
        }




    }

    if(paymentOption == "card"){

        const order = await createOrder({
            staffId : Application.staffId ,
            pharmacyId : Application.pharmacyId, 
            items ,
            paymentMethod:"card",
            
        })

        if(order.status == "error"){
            swal({
                title:"Order not Created",
                icon:"error",
                text : order.error,
            })
            return;
        }

        


        const payment = await Payment.create({
            orderId : order.results.orderId,
            amount: order.results.amount || 0,
            first_name : formData.get('f-name') || "no name",
            last_name : formData.get('l-name') || "no name",
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

        await payment.makePayment();

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

printBtn.addEventListener("click" , ()=>{
    print()
    // console.log('clicked');
    // const receipt = document.querySelector(".orders .receipt-card");
    // const body = document.createElement('body');
    // body.insertAdjacentElement('afterbegin',receipt);
    // body.addEventListener('click' , ()=>{
    //     print();
    // })

    // body.click();
    
});




async function showOrders(e){
    const data = await getOrdersList();


    setDrawerContent(createOrderTable(data.results));
    openDrawer(e);
    const orderCloseBtn = document.querySelector(".order-table-close-btn.close-btn > button");
    orderCloseBtn?.addEventListener("click" , (e)=>{
        closeDrawer();
        init();
    })


    const orderTable = document.querySelector(".pharmacy-order-records");
    orderTable?.addEventListener("click" , (e)=>{
        const tr = e.target.closest("tr");
        if(tr){
            const orderId = tr.dataset.id;
            const order = data.results.filter(order=>order.id == orderId)[0];

            setDrawerContent(orderView(order));
            openDrawer();

            const backBtn = document.querySelector(".order-container-order-view-back-btn");
            backBtn?.addEventListener("click" , ()=>{
                showOrders();
            });

            const orderViewContainer = document.querySelector(".order-container-order-view");

            orderViewContainer?.addEventListener("click" , e=>{
                const target = e.target;

                const deleteBtn = target.closest(".delete");
                if(deleteBtn){
                    swal({
                        title:"are you want to delete ?",
                        icon:"question",
                        showConfirmButton:true,
                        showCancelButton: true,
                    }).then(data=>{
                        if(data.isConfirmed){
                            return deleteOrder(deleteBtn.dataset.id);
                        }
                    }).then(data=>{
                        console.log(data);
                        if(data.status == "error"){
                            swal({
                                icon:"error",
                                title:"some thing went wrong",
                                text:data.message || " ",
                            })
                        }else{
                            swal({
                                icon:"success",
                                title:"order deleted successfully",
                            }).then(()=>{
                                showOrders();
                            })
                        }
                    })
                }
            })
        




        }else{
            return;
        }
    })




}




