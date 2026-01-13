import Application from "../../../model/application/Application.js";
import { fetchMedicineData } from "../../../model/pharmacy/fetchMedicineData.js";
import { openOrdersPaymentMode } from "../../../view/pharmacy/orders__viewPaymentMode.js";
import { createMedicineCards, renderMedicineCards } from "../../../view/pharmacy/renderMedicineCards.js";
import { setTextContent } from "../helpers.js";
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




export function updateCardList(cartList , orders ){
    setTextContent(numberOfItemsInCart , Application.getOrderItems().length);
    setTextContent(priceOfCartItems , calcCartPrice().toLocaleString('En-us'));
    const orderCards = createMedicineCards(orders);
    renderMedicineCards(cartList , orderCards);
}


/**
 * 
 * @param {Application.OrderItem} orderItem 
 * @param {Application.OrderItem[]} orderItem 
 */
function onPushOrderItem (orderItem , orderItemsCollection){
    setTextContent(numberOfItemsInCart , orderItemsCollection.length);
    setTextContent(priceOfCartItems , calcCartPrice().toLocaleString('En-us'));

    // re structure order collection
    const orders = orderItemsCollection.map(item=>{
        const order ={...item , ...item.getMedicine()};
        return order;
    });

    updateCardList(cartList , orders);
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


cartList?.addEventListener('click' , (e)=>{
    const target = e.target;
    const removeBtn = target.closest(".close-btn");

    if(removeBtn){
        const id = target.closest('.medicine_card').dataset.id;
        Application.removeOrderItem({medicineId : id});
        updateCardList(cartList , Application.getOrderItems());
    }
})
