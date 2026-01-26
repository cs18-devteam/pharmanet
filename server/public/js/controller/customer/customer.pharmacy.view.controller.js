import { fetchCustomerCartData } from "../../model/customer/fetchCustomerCartData.js";
import Cart from "../../view/customer/Cart.js";
const cart = new Cart('.overlay-cart');
const btn_yourCart = document.querySelector('.cartbtn.viewCart');
const btn_cartContinue = document.querySelector('.overlay-cart__continue');
const btn_messagePharmacy = document.querySelector('.contact-card .btn');


async function startOrderProcess(e){
    const data = await fetchCustomerCartData();
    console.log(data);
    cart.openLeftPanel();
}


btn_yourCart?.addEventListener('click' ,async (e)=>{
    cart.openRightPanel();
    btn_cartContinue?.addEventListener('click' , startOrderProcess);
})


btn_messagePharmacy?.addEventListener('click' , (e)=>{
    cart.openLeftPanel();
})



