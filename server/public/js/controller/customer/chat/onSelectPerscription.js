import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import cart from "../../../view/customer/Cart.js";
import { swal } from "../../../view/swal.js";

export default async function onSelectPrescription(e, input, card, skip) {
    try {
        skip.addEventListener('click', () => cart.closePopup());


        const file = input.files[0];
        const formData = new FormData();
        formData.append('prescription', file);
        formData.append('orderId', Application.remoteOrderId);

        const cartUploadButton = card.querySelector('label[for="prescription-upload-input"]');
        const response = await fetch(`/api/v1/customers/${Application.userId}/chats/assets/prescriptions`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.status == "success") {
            Application.connection.send(ChatTemplates.syncConnection(data.orderId))
            cartUploadButton.textContent = "uploading...";
            swal({
                title: "Prescription uploaded",
                icon: "success",
            })



        } else {
            console.log(data);
            renderToast("prescription upload failed", 'error');
        }
        cart.closePopup();







    } catch (e) {
        console.log(e);
    }


}