import cart from "./Cart.js";

export default function onClickSkipBtnOfPrescriptionPopup(){
    const prescriptionSkipBtn = document.querySelector(".card-prescription-upload");

    prescriptionSkipBtn.addEventListener('click' , ()=>{
        cart.closePopup();
    })
}