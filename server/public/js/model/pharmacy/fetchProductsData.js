import Application from "../application/Application.js";

export async function getProducts(search ,limit = 10) {
    try{
        const response = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/products?limit=${limit}${search ? `&search=${search}` : ""}`);
        
        const data = await response.json();
        if(data.status == "error"){
            throw new Error(data.message);
        }


        return data;
    }catch(e){
        console.log(e);
        return {
            status:"error",
            results:[],
            message:e.message,
        }
    }
}


/**
 * 
 * @param {FormData} product 
 */
export async function createProduct(product){
    try{
        const response = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/products/create` , {
            method:"POST",
            body : product,
        });

        const data = await response.json();
        console.log(data);

        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:e.message,
            results:[],
        }
    }
}


export async function getProductData(productId) {
       try{
        const response = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/products/${productId}`);

        const data = await response.json();

        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:e.message,
            results:[],
        }
    }
}


export async function deleteProduct(productId) {
    try{
        const response = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/products/${productId}` , {
            method:"DELETE",
        });


        if(response.status == 204){
            return {
                status:"success",
                productId : productId,
            }
        }

        const data = await response.json();

        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:e.message,
            results:[],
        }
    }
}

/**
 * 
 * @param {number} productId 
 * @param {FormData} product 
 * @returns 
 */

export async function updateProduct(productId , product) {
    try{
        const response = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/products/${productId}` , {
            method:"PATCH",
            body: product,
        });

        const data = await response.json();

        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:e.message,
            results:[],
        }
    }
}