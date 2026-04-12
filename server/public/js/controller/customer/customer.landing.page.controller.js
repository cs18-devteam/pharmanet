import Application from "../../model/application/Application.js";
import { uploadPrescriptionAndCreateOrder } from "../../model/customer/orders.js";
import { deleteOrder } from "../../model/pharmacy/orders.js";
import { renderToast } from "../../view/renderToast.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";

const inputFile = document.getElementById("fileUpload");
const uploadbox = document.querySelector(".upload-box");

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
        
        Application.remoteOrderId = results.data.id;
        let pharmacies = [];
        let radius = 0;

        await Promise.all([3 , 5, 7 , 10 , 20 , 30 , 100 ].map(async distance=>{
            if(10 < pharmacies.length) return;
            radius = distance;
            const pharmacyList = await getNearByPharmacies(distance);
            pharmacies = [...pharmacies , ...pharmacyList];
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


        

    }catch(e){
        console.log(e);
    }
}



async function getNearByPharmacies(distance) {
    try{
        const response = await fetch(`/api/v1/customers/${Application.userId}/pharmacies/nearby`);
        const data = await response.json();
        if(data.status == "error") return [];
        return data.data;

    }catch(e){
        console.log(e);
        return [];
    }
}

