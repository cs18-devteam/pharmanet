const orders = document.querySelector('.orders.container')
console.log(orders);


export function openOrdersPaymentMode(){
    orders.classList.add('payment-mode');
}


export function closeOrdersPaymentMode(){
    orders.classList.remove('payment-mode');
}