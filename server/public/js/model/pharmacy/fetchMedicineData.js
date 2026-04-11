import Application from "../application/Application.js";

export async function fetchMedicineData(name , limit , pharmacyId = 1){
    try{

        const respond = await fetch(`/api/v1/pharmacies/${pharmacyId}/medicines${name ? `?search=${name}&`:'?'}${limit ? `limit=${limit}`: ' '}`);
        const data = await respond.json();
        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:e.message,
        }
    }
}

export async function fetchMedicineStockSummery(pharmacyId){
    try{
        const respond = await fetch(`/api/v1/pharmacies/${pharmacyId}/medicines/info`);
        const results = await respond.json();
        return results;

    }catch(e){
        console.log(e);
        return {
            status:'error',
            message: e.message,
        }
    }
}

export async function fetchStocksData(name , limit , pharmacyId = 1){
    try{

        const respond = await fetch(`/api/v1/pharmacies/${pharmacyId}/stocks${name ? `?search=${name}&`:'?'}${limit ? `limit=${limit}`: ' '}`);
        const data = await respond.json();
        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:e.message,
        }
    }
}
export async function fetchLowStocks(pharmacyId){
    try{
        if(!pharmacyId) return;
        const respond = await fetch(`/api/v1/pharmacies/${pharmacyId}/stocks/low`);
        const data = await respond.json();
        return data;

    }catch(e){
        return {
            status:"error",
            message:e.message,
        }
    }
}

export async function fetchMedicineStats(){
    try{
        if(!Application.pharmacyId) return;
        const respond = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/medicines/stat`);
        const data = await respond.json();
        return data;

    }catch(e){
        return {
            status:"error",
            message:e.message,
        }
    }
}



