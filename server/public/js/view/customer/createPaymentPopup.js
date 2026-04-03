import html from "../html.js";

export function createPaymentPopup(){
    return html`
        <div class="payment-popup">
            <h2>Payment Requested</h2>
            <p>select payment method</p>
            <div class="payment-methods">
                <button class="cash" >cash</button>
                <button class="card" >card</button>
            </div>
        </div>
    `
}