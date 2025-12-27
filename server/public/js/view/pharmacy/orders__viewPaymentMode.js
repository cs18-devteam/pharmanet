const orders = document.querySelector('.orders.container')


export function openOrdersPaymentMode(){
    orders.classList.add('payment-mode');
}


export function closeOrdersPaymentMode(){
    orders.classList.remove('payment-mode');
}