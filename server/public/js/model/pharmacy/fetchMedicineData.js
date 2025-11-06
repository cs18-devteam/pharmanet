export async function fetchMedicineData(name , limit , pharmacyId = 1){
    try{

        const respond = await fetch(`/api/pharmacies/${pharmacyId}/medicines${name ? `?search=${name}&`:'?'} ${limit ? `limit=${limit}`: ' '}`);
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
        const respond = await fetch(`/api/pharmacies/${pharmacyId}/medicines/info`);
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

