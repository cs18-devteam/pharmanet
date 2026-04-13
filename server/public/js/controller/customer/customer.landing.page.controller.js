import Application from "../../model/application/Application.js";
import { getNearByPharmacies } from "../../model/customer/getNearbyPharmacies.js";
import { createOrder, uploadPrescriptionAndCreateOrder } from "../../model/customer/orders.js";
import { deleteOrder } from "../../model/pharmacy/orders.js";
import CustomerChatBox from "../../view/customer/CustomerChatBox.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";
import { sendConnectionRequests } from "./chat/sendBatchConnectionRequest.js";
import { removeWait, setWait } from "./chat/setUploadBoxToWaitingState.js";

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
        setWait();
        const results = await uploadPrescriptionAndCreateOrder(prescription);
        if (results.status == "error") {
            removeSpinner();
            removeWait();
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
            pharmacyList.forEach(p=>{
                const pharmacy = Application.remotePharmacyList.find(p1=>p1.id == p.id);
                if(pharmacy) return; 
                Application.remotePharmacyList.push(p);
            })
            
        }));

        if(!Application.remotePharmacyList.length){
            swal({
                title:`No Pharmacy Found`,
                icon:"error",
                text : `We search for ${radius}KM , but couldn't find any one`,
            })

            await deleteOrder(Application.remoteOrderId);
            Application.remoteOrderId = undefined;
        }else{
            sendConnectionRequests(Application.remoteOrderId);
        }
        
    }catch(e){
        removeWait();
        removeSpinner();
        console.log(e);
    }
}








