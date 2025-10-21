import Application from "../application/Application.js";

class Model{

    static create = async (url , params , data) => {
        const respond = await Application.server.save({
            url : Application.registry.DynamicURL(url , params
            ),
            data,
        })

        return respond;
    }

    static getById = async (url ,params)=>{
        const respond = await Application.server.get({
            url : Application.registry.DynamicURL(url , params)
        });
    }

    static all = async (url = "" , params = {}) =>{
        const respond = await Application.server.get({
            url : Application.registry.DynamicURL( url , params),
        });

        return respond;
    }

    static delete = async (url , params)=>{
        const respond = await Application.server.delete({
            url : Application.registry.DynamicURL(url , params),
        });
        const results =  await respond.json();
        return results;

    }

    static update = async (url , params , data)=>{
        const respond = await Application.server.update({
            url : Application.registry.DynamicURL(url , params),
            data ,
        });
        const results =  await respond.json();
        return results;
    }


    delete(){}
    get(){}
    create(){}
    update(){}



}




class Medicine extends Model{
    #id;
    #serialNumber;
    #countryCode;
    #geneticName;
    #schedule;
    #registrationNo;
    #agentCode;
    #menuCode;
    #packType;
    #dosageCode;

    constructor({id , serialNumber , countryCode , geneticName , schedule , registrationNo , agentCode , menuCode , packType , dosageCode}){
        super();
        this.#id = id;
        this.#serialNumber = serialNumber;
        this.#countryCode = countryCode;
        this.#geneticName = geneticName;
        this.#schedule = schedule;
        this.#registrationNo = registrationNo;
        this.#agentCode = agentCode;
        this.#menuCode = menuCode;
        this.#packType = packType;
        this.#dosageCode = dosageCode;
    }

    static getById = async (id)=>{
        const respond = await Application.server.get({
            url : Application.registry.DynamicURL(Application.registry.URL_ADMIN_MEDICINES_MEDICINE , {
                id , 
                adminId : 1,

            }),
        });
        const body = await respond.json();
        const data = body.data[0];
        console.log(data);
        const medicine = new Medicine(data);
        return medicine;
        
    }

    get(){
        const medicine = {
            id : this.#id,
            serialNumber : this.#serialNumber,
            countryCode : this.#countryCode,
            genericName : this.#geneticName,
            schedule : this.#schedule,
            registrationNo : this.#registrationNo,
            agentCode : this.#agentCode,
            menuCode : this.#menuCode,
            packType : this.#packType,
            dosageCode : this.#dosageCode,
        }

        return medicine;
    }

    static all = async () => Model.all(Application.registry.URL_ADMIN_MEDICINES , {
        adminId:1,
    });



    create = async () => {
        const respond =await Model.create(Application.registry.URL_ADMIN_MEDICINES_CREATE , {
            adminId:1,
        } , this.get());
        const body = await respond.json();
        this.#id = body.id;
        return body;

    }

    


    delete = async () => Model.delete(Application.registry.URL_ADMIN_MEDICINES_MEDICINE , {
        adminId : 1, 
        medicineId: this.#id,
    })

    update = async ()=> Model.update(Application.registry.URL_ADMIN_MEDICINES_MEDICINE , {
        adminId:1,
        medicineId : this.#id,
    } , this.get())

}

export default Medicine;