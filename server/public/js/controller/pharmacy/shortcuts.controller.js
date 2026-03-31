import getDashboardContext from "../../view/getDashboardContext.js";
import {  switchWindow } from "../../view/pharmacy/changeWindow.js";

const isMacOs = window.navigator.userAgent.includes("Mac");


const CTRL = isMacOs ? "Meta" : "Control";
const SHIFT = "Shift";
const F1 = "F1";
const F2 = "F2";
const F3 = "F3";
const F4 = "F4";
const F5 = "F5";
const F6 = "F6";
const F7 = "F7";
const F8 = "F8";
const F9 = "F9";
const F10 = "F10";
const F11 = "F11";
const F12 = "F12";
const ALT = 'Alt'


/**
 * 
 * @param {KeyboardEvent} e 
 * @param  {string[]} keyCombination 
 * @returns 
 */
function checkKeys(e , ...keyCombination){
    console.log(keyCombination);
    console.log(e.key , e.metaKey ? "Meta" : "" , e.shiftKey ? "shift" : "" , e.ctrlKey ? "ctrl":"" , e.altKey ? "ALT" : "");

    if(e.key == CTRL) return;
    if(e.key == SHIFT) return;
    if(e.key == ALT) return;


    if(!keyCombination.includes(e.key)){
        return false;
    } 
    if(isMacOs){
        if(keyCombination.includes(CTRL) && !e.metaKey)  {
            return false
        };
    }else{
        if(keyCombination.includes(CTRL) && !e.ctrlKey)  {
            return false;
        }
    }

    if(keyCombination.includes(SHIFT) && !e.shiftKey) {
        return false
    };

    if(keyCombination.includes(ALT) && !e.altKey){
        return false;
    }

    e.preventDefault();
    return true;;
}



function checkContextKeys(e , targetContext , ...keyCombination){
    const context = getDashboardContext();
    if(context != targetContext ) return false;
    console.log('context matched');
    return checkKeys(e , ...keyCombination);
}


document.body.addEventListener("keydown" , (e)=>{
    
    
    if(checkKeys(e ,CTRL , SHIFT , 'c')) switchWindow('chats');
    if(checkKeys(e ,CTRL , SHIFT , 'o')) switchWindow('orders');
    if(checkKeys(e ,CTRL , SHIFT , 'm')) switchWindow('medicines');
    if(checkKeys(e ,CTRL , SHIFT , 'p')) switchWindow('products');
    if(checkKeys(e ,CTRL , SHIFT , 'r')) switchWindow('transactions');
    if(checkKeys(e ,CTRL , SHIFT , 's')) switchWindow('staff');
    if(checkKeys(e ,CTRL , SHIFT , 'd')) switchWindow('docs');

    if(checkKeys(e , F1)) switchWindow('orders');
    if(checkKeys(e , F2)) switchWindow('chats');
    if(checkKeys(e , F3)) switchWindow('medicines');
    if(checkKeys(e , F4)) switchWindow('transactions');
    if(checkKeys(e , F5)) switchWindow('products');
    if(checkKeys(e , F6)) switchWindow('docs');
    if(checkKeys(e , F7)) switchWindow('staff');


    //shortcuts base on window
    console.log('context keys : ' , checkContextKeys(e , "orders" , 'n'));
    if(checkContextKeys(e , "orders" ,ALT , '/')) focusElement(".orders .search-bar__input");
    if(checkContextKeys(e , "orders" ,ALT , '÷')) focusElement(".orders .search-bar__input");
    if(checkContextKeys(e , "orders" , ALT , 'π')) clickElement(".orders .quick_access_2 .pay_button");
    if(checkContextKeys(e , "orders" , ALT , 'p')) clickElement(".orders .quick_access_2 .pay_button");

    
    
    
})


function clickElement(selector){
    document.querySelector(selector)?.click();
}

function focusElement(selector){
    document.querySelector(selector)?.focus();
}
