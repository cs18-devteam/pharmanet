import Application from "../application/Application.js";

export async function getNearByPharmacies(distance) {
    try{
        const response = await fetch(`/api/v1/customers/${Application.userId}/pharmacies/nearby?distance=${distance}`);
        const data = await response.json();
        if(data.status == "error") return [];
        return data.data;

    }catch(e){
        console.log(e);
        return [];
    }
}
