import Application from "../application/Application.js";

export async function createStaff(formData) {
    try{
        const response = await fetch(`/pharmacies/${Application.pharmacyId}/staff/create` , {
            method: "POST",
            body : formData,
        });

        const data = await response.json();
        return data;

    }catch(e){
        return {
            status:"error",
            results: [],
            message: e.message,
        }
    }
}   


export async function getStaffData() {
    try{

        const response = await fetch(`/pharmacies/${Application.pharmacyId}/staff` , {
            method: "GET",
        });

        const data = await response.json();
        return data;
        

    }catch(e){
        console.log(e);
        return {
            status:"error",
            results:[],
            message: e.message,
        }
    }
}