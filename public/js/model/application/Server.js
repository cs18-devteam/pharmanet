import ApplicationError from "./ApplicationError.js";

class Server{

    static TIMEOUT = 5000;
    
    static async request({url , body , method , headers={
        'Content-Type' : "application/json",
    }}){
        try{
            console.log({url , body , method , headers});

            return new Promise((resolve)=>{

                
                const respond  =  fetch(url , {
                    method , 
                    headers,
                    body
                });
                const timeout = setTimeout(()=>resolve({
                    status : "error",
                    message : "request timeout",
                }) , Server.TIMEOUT );

                respond.then(data => {
                    resolve(data);
                    clearTimeout(timeout);
                });
            })
        
        }catch(error){
            return new ApplicationError(error.code || 400 , "Request Error"  , error);
        }
    }



    static async save({url , data}){
        try{
            const respond = await Server.request({
                url ,
                method: "POST",
                body : JSON.stringify(data),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            return respond;
        }catch(error){
            return new ApplicationError(error.code || 400 , "CREATE request failed"  , error);
        }
    }


    static async get({url , filters}){
        try{
            const data = await Server.request({
                url ,
                method: "GET",
                body : filters,
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            return data;
        }catch(error){
            return new ApplicationError(error.code || 400 , "GET request failed"  , error);
        }
    }


    static async update({url , data}){
        try{
            const respond = await Server.request({
                url ,
                method: "PATCH",
                body : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            return respond;
        }catch(error){
            return new ApplicationError(error.code || 400 , "PATCH request failed"  , error);
        } 
    }

    static async delete({url , data}){
        try{
            const respond = await Server.request({
                url ,
                method: "DELETE",
                body : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            return respond;
        }catch(error){
            return new ApplicationError(error.code || 400 , "DELETE request failed"  , error);
        } 
    }
}

export default Server;