class Registry{

    static BLOG_SERVICE = "http://localhost:3001/api/blogs" ;
    static LEAVE_SERVICE = "http://localhost:3002/api/leaves";
    static MEDICINE_SERVICE = "http://localhost:3003/api/medicines";
    static ORDER_SERVICE = "http://localhost:3004/api/users";
    static PHARMACY_SERVICE = "http://localhost:3005/api/pharmacies";
    static PRODUCT_SERVICE = "http://localhost:3006/api/products";
    static TRANSACTION_SERVICE = "http://localhost:3007/api/transactions";
    static CUSTOMER_SERVICE = "http://localhost:3008/api/users/customers";
    static STAFF_SERVICE = "http://localhost:3008/api/users/staff"

    static Health = {};
    
    static async health(){ 

        const services  = Object.entries(Registry).filter(([property])=>{
            if(property.endsWith('_SERVICE')) return true;
            else false;
        });

        const servicesPromises = services.map(async ([service , url])=>{
            const MILLISECONDS = 5000;
            const time = Date.now();
            return new Promise((resolve , reject ) => {
                const timeout = setTimeout(()=>resolve({
                    name : service,
                    status:"error",
                    message: "timeout",
                    time : Date.now() - time,
                }) , MILLISECONDS);
            
                const respond = fetch(url , {
                    method:'get'
                });
                respond.then(()=>{
                    clearTimeout(timeout);
                    return resolve({
                        name : service,
                        status:"success",
                        time : Date.now() - time,
                    })
                }).catch(e=> resolve({
                    name : service,
                    status:"error",
                    message:e.message,
                    time : Date.now() - time,
                }))

            });
        })

        Promise.all(servicesPromises).then(report=>{

            report.forEach(service=>{
                Registry.Health[service.name] = {
                    status : service.status,
                    time : service.time,
                    message : service.message,
                }
            })
            console.table(Registry.Health);
        }).catch(e=> console.error(e));
    }

}


module.exports = Registry;