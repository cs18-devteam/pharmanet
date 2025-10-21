import Application from "../../model/application/Application.js";
import Medicine from "../../model/primitive/Medicine.js";

const form__medicineCreateForm = document.querySelector(".medicine-create-form");

document.body.addEventListener( 'click' ,async (e)=>{
    const target = e.target;

    const updateButton = target.closest('.medicine-card-update-btn');
    const deleteButton = target.closest('.medicine-card-delete-btn')
    if(deleteButton){
        console.log(deleteButton);
        const medicineId = deleteButton.dataset.id;
        if(!medicineId) return;
        const respond = await Application.load(
            Medicine.delete , 
            Application.registry.URL_ADMIN_MEDICINES_MEDICINE,
            {
                id:medicineId,
                adminId:1,
            }
        )
        console.log(respond);
    
    }
})




form__medicineCreateForm?.addEventListener('submit' ,async (e)=>{
    e.preventDefault();
    
    const formData = new FormData(form__medicineCreateForm);

    const data = {};
    for(const [key , value] of formData.entries()){
        data[key] = value;
    }


    const newMedicine = new Medicine({
        dosageCode: data.dosageCode,
        countryCode : data.countryCode,
        geneticName : data.geneticName,
        schedule : data.schedule,
        registrationNo : data.registrationNo,
        agentCode : data.agentCode,
        menuCode : data.menuCode,
        packType : data.packType,
        serialNumber : data.serialNumber,
        description : data.description,
    });

    const respond = await Application.load(newMedicine.create);
    if(respond.status == "success"){
        Application.navigator.refresh();
    }else{
        alert("Item Not Added ❌");
    }
    
});


