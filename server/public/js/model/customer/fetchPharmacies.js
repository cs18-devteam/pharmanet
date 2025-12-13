export async function fetchOnlinePharmacies(mode="online"){
    try{

        const response = await fetch(`/api/v1/pharmacies?mode=${mode}`);
        const data = await response.json();
        if(data.status == "error"){
            throw new Error(data.error);
        }


        return {
            status: data.status,
            results: data.results,
        }
    }catch(e){
        return {
            status:"error",
            results:[],
            message:"something went wrong"
        }
    }
}