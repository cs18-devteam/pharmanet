const baseUrl = "/api/products";

async function request(data , method = "GET"){
    try{
        const respond = await fetch(baseUrl , {
            method : method?.toUpperCase(),
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data),
        })
        
        const result = await respond.json();
        return result;
    }catch(e){
        console.error(`Error From Model.Request.${method} ${baseUrl}:` , e);
        throw e;
    }
}



export async function create(data){
    try{
        return await request(data , "POST");
    }catch(e){
        console.error(`Error From Model.${this.name} ${baseUrl}:` , e);
        throw e;
    }
}

export async function destroy(data){
    try{
        return await request(data , "DELETE")
    }catch(e){
        console.error(`Error From Model.${this.name} ${baseUrl}:` , e);
        throw e;
    }
}

export async function update(data){
    try{
        return await request(data , "PATCH")
    }catch(e){
        console.error(`Error From Model.${this.name} ${baseUrl}:` , e);
        throw e;
    }
}

export async function get(data){
    try{
        return await request(data , "GET")
    }catch(e){
        console.error(`Error From Model.${this.name} ${baseUrl}:` , e);
        throw e;
    }
}