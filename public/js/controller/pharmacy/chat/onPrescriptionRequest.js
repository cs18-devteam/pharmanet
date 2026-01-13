import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { renderToast } from "../../../view/renderToast.js";
import { swal } from "../../../view/swal.js";

export async function onPrescriptionRequest() {
    const prescriptionUploadBtn = document.querySelector(".request-prescription-btn");

    prescriptionUploadBtn.addEventListener('click' , e=>{
        try{
            Application.connection.send(ChatTemplates.requestPrescription());
            swal({
                title : "prescription requested",
                icon:"success",
            });
        }catch(e){
            console.log(e);
            swal({
                title:"something went wrong",
                text: e.message,
                icon:"error",
            })
        }
    })
}