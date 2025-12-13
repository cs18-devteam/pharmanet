import cart from "./customer.cart.controller.js";

const btn_navMyCartBtn = document.querySelector('.setting-dropdown .cart-btn');


btn_navMyCartBtn?.addEventListener('click' , ()=>{
    cart.openRightPanel();
})

