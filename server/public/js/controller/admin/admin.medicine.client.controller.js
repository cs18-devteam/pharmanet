import Application from "../../model/application/Application.js";
import Medicine from "../../model/primitive/Medicine.js";

const form__medicineCreateForm = document.querySelector(".medicine-create-form");
const btn__medicineCreateForm = document.querySelector(".medicine-create-btn");

document.body.addEventListener( 'click' ,async (e)=>{
    const target = e.target;

    const updateButton = target.closest('.medicine-card-update-btn');
    const deleteButton = target.closest('.medicine-card-delete-btn');
    if(deleteButton){
        const medicineId = deleteButton.dataset.id;
        if(!medicineId) return;
        console.log(medicineId , Application.registry.URL_ADMIN_MEDICINES_MEDICINE);
        const respond = await Application.load( Medicine.deleteById , 3)
    
        return;
    }

    if(updateButton){
        const medicineId = updateButton.dataset.id;
        if(!medicineId) return;
        const medicine =await Application.load(Medicine.getById , medicineId);
        const data = medicine.get();
        Application.dom.setValue([
            ["[name=price]" , data.price],
            ["[name=manufacturer]" , data.menuCode],
            ["[name=geneticName]" , data.genericName],
            ["[name=dosageCode]" , data.dosageCode],
            ["[name=serialNumber]" , data.serialNumber],
            ["[name=registrationNo]" , data.registrationNo],
            ["[name=schedule]" , data.schedule],
        ]);

        Application.dom.replaceContent(btn__medicineCreateForm , "Update Medicine");
        
        
        
        return ;


        const respond = await Application.load(
            Medicine.update , 
            Application.registry.URL_ADMIN_MEDICINES_MEDICINE,
            {
                id:medicineId,
                adminId:1,
            }
        )

        console.log(respond);
        const results = await respond.json();
        console.log(results);
        return;

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


