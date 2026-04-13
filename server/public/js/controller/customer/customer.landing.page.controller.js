import Application from "../../model/application/Application.js";
import { getNearByPharmacies } from "../../model/customer/getNearbyPharmacies.js";
import { createOrder, uploadPrescriptionAndCreateOrder } from "../../model/customer/orders.js";
import { deleteOrder } from "../../model/pharmacy/orders.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";
import { sendConnectionRequests } from "./chat/sendBatchConnectionRequest.js";

const inputFile = document.getElementById("fileUpload");
let pharmacies = [];

inputFile.addEventListener("change", e => {
    const prescription = e.target.files[0];
    if (!prescription.type.startsWith("image/")) return;
    startOrderProcess(prescription);
})

const eventList = ["dragenter", "dragover", "dragleave", "drop"];
eventList.forEach(event => {
    document.addEventListener(event, async e => {
        e.preventDefault();

        if (event == "drop") {
            const prescription = e.dataTransfer.files[0];
            if (!prescription.type.startsWith("image/")) return;
            startOrderProcess(prescription);
        }
    })
})


async function startOrderProcess(prescription) {
    try{
        renderSpinner();
        const results = await uploadPrescriptionAndCreateOrder(prescription);
        if (results.status == "error") {
            removeSpinner();
            swal({
                title: "File not uploaded",
                icon: "error",
                text: results.message,
            })
        }else{
            removeSpinner();
        }
        
        // init default variables for chatbox
        Application.remoteOrderId = results.data.id;
        Application.remotePrescription = results.data.prescription;
        Application.remoteRedirectMode = true;
        Application.remotePharmacyList = [];
        let radius = 0;

        await Promise.all([3 , 5, 7 , 10 , 20 , 30 , 100 ].map(async distance=>{
            if(10 < pharmacies.length) return;
            radius = distance;
            const pharmacyList = await getNearByPharmacies(distance);
            Application.remotePharmacyList = [...pharmacies , ...pharmacyList];
        }));

        if(!pharmacies.length){
            swal({
                title:`No Pharmacy Found`,
                icon:"error",
                text : `We search for ${radius}KM , but couldn't find any one`,
            })

            await deleteOrder(Application.remoteOrderId);
            Application.remoteOrderId = undefined;
        }


        sendConnectionRequests(Application.remoteOrderId);
        
    }catch(e){
        console.log(e);
    }
}



async function redirect(){
    try{

        const order = await createOrder([] , Application.remotePrescription);
        if(order.status == "error"){
            throw new Error("some thing went wrong");
        }
        sendConnectionRequests(order.data.id);
    }catch(e){
        console.log(e);
        swal({
            title:"error",
            icon:"error",
            text:  e.message,
        })
    }
}






