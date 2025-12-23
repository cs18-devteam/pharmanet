import Application from "../../model/application/Application.js";
import { fetchMedicineData } from "../../model/pharmacy/fetchMedicineData.js";
import { openOrdersPaymentMode } from "../../view/pharmacy/orders__viewPaymentMode.js";
import { createMedicineCards, renderMedicineCards } from "../../view/pharmacy/renderMedicineCards.js";
import { setTextContent } from "./helpers.js";
const medicineCardContainer = document.querySelector(".orders .medicine_card_container");
const orderCount = document.querySelector('.orders .total__orders__description__amount');
const numberOfItemsInCart = document.querySelector('.orders .no_of_cart_items');
const priceOfCartItems = document.querySelector('.orders .amount_of_cart_items');
const cartList = document.querySelector('.orders .cart_list');




export default function orders__searchAndRenderMedicineCard(search="" , limit=6){
    fetchMedicineData(search , limit).then(({results})=>{
        Application.setOrderMedicineResultsStack(results);
        const medicineCards = createMedicineCards(results);
        renderMedicineCards(medicineCardContainer , medicineCards);
    })
}

/**
 * 
 * @returns {number}
 */
function calcCartPrice(){
    return Application.getOrderItems().reduce((acc , OItems)=>{
        return acc + OItems.getMedicine()?.stock.price *  OItems.units - OItems.discounts;
    } , 0)
}


function init(){
    setTextContent(numberOfItemsInCart , Application.getOrderItems().length)
    setTextContent(priceOfCartItems , calcCartPrice());
    orders__searchAndRenderMedicineCard();
}






/**
 * 
 * @param {Application.OrderItem} orderItem 
 * @param {Application.OrderItem[]} orderItem 
 */
function onPushOrderItem (orderItem , orderItemsCollection){
    setTextContent(numberOfItemsInCart , orderItemsCollection.length);
    setTextContent(priceOfCartItems , calcCartPrice().toLocaleString('En-us'));
    console.log(orderItem);

    // re structure order collection
    const orders = orderItemsCollection.map(item=>{
        const order ={...item , ...item.getMedicine()};
        return order;
    })


    const orderCards = createMedicineCards(orders);
    renderMedicineCards(cartList , orderCards);
}



medicineCardContainer?.addEventListener('click' , e=>{
    /**
     * @type {HTMLElement}
     */
    const target = e.target;
    /**
     * @type {HTMLElement}
     */
    const card = target.closest('.medicine_card');
    const addBtn = target.closest('.add');
    const form = target.closest('.order-add-form');
    if(card && !form){
        if(card.classList.contains('show-order-add-form')){
            card.classList.remove('show-order-add-form');
        }else{
            card.classList.add('show-order-add-form');
        }

    }else if(addBtn){
        //add button clicked
        const inputs = form.querySelectorAll("input");
        
        const formData = {}

        Array.from(inputs).forEach(i=>{
            formData[i.name] = +i.value;
        })

        formData.medicineId = card.dataset.id;

        const orderItem = new Application.OrderItem(formData.units , formData.days , formData.discounts , formData.medicineId);
        Application.onPushOrderItems(onPushOrderItem);
        Application.addToOrders(orderItem);


        
    }


    
})

init();