import { getCustomerCarts } from "../../model/customer/cart.model.js";
import { createCartCards } from "../../view/customer/cart.card.js";
import cart from "./../../view/customer/Cart.js";

const btn_navMyCartBtn = document.querySelector('.setting-dropdown .cart-btn');


btn_navMyCartBtn?.addEventListener('click' ,async ()=>{
    cart.openRightPanel();
    const customerCartData =await getCustomerCarts(1);
    const cartCards = createCartCards(customerCartData.results);
    const cartContainer = document.querySelector('.overlay-cart .carts_container');
    cartContainer.innerHTML = cartCards.join(' ');
})

