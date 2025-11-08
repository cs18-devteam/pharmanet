async function handleStockMedicines( pharmacyId ,method , stock){
    console.log(stock);
    

    try{

        const respond =  await fetch(`/api/v1/pharmacies/${pharmacyId}/stock/medicines` , {
            method: method || "POST",
            body : JSON.stringify({
                medicineId : stock.id,
                pharmacyId : pharmacyId,
                stock : stock.stock,
                publicStock : stock.publicStock,
                price : stock.price,

            })
        })

        const data = await respond.json();
        return data;

    }catch(e){
        console.log(e);
        throw new Error({
            status:"error",
            error : e,
        });
        
    }
}



export async function getMedicineByStockId({pharmacyId , stockId}){
    try{
        const respond = await fetch(`/api/v1/pharmacies/${pharmacyId}/stock/medicines/${stockId}`,{
            method :"GET",
        })

        const data = await respond.json();
        console.log(data);
        
        return data;

    }catch(e){
        console.log(e);
        return {
            status:'error',
            error: e,
        }
        
    }
}



export async function createStockMedicine({pharmacyId , stock}){
    try{

        const data = await handleStockMedicines(pharmacyId ,"POST" ,stock)
        return data;
    }catch(e){
        console.log(e);
        return {
            status:"error",
            error : e,
        }
        
    }
}


export async function updateMedicineStock({pharmacyId , stock}){
    try{

        const data = await handleStockMedicines(pharmacyId ,"UPDATE" ,stock)
        return data;
    }catch(e){
        console.log(e);
        return {
            status:"error",
            error : e,
        }
        
    }
}