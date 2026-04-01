import html from "../../html.js";
const receiptCard = document.querySelector(".orders .receipt-card");
const receiptPharmacyName = document.querySelector(".receipt-title h3");
const receiptId = document.querySelector(".orders .receipt-title small");
const receiptTable = document.querySelector(".orders .receipt-table");
const total = document.querySelector(".orders .total-amount");


/**
 * @typedef {updateReceiptOptions} receiptOption
 */
const updateReceiptOptions = {
    pharmacyName : "",
    orderId :"",
    items : [{
        quantity: 0,
        name : "",
        days: 0,
        price : 0,
    }],
    total : "",
}


/**
 * 
 * @param {receiptOption} options 
 */
export function updateReceipt(options){

    console.log(options);

    receiptPharmacyName.textContent = options.pharmacyName;
    receiptId.textContent = options.orderId;
    receiptTable.innerHTML = options.items.map(item=>html`<tr>
        <td>${item.quantity} × ${item.name.slice(0 , 15)+"..."}</td>
        <td>for ${item.days} Days</td>
        <td>Rs</td>
        <td>${item.price}</td>
    </tr>`).join(' ');
    total.textContent = `Rs ${options.total}`;
}