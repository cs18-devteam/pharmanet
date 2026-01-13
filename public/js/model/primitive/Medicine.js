import Application from "../application/Application.js";




class Medicine extends Application.Model{
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

    static all = async () => Application.Model.all(Application.registry.URL_ADMIN_MEDICINES , {
        adminId:1,
    });



    create = async () => {
        const respond =await Application.Model.create(Application.registry.URL_ADMIN_MEDICINES_CREATE , {
            adminId:1,
        } , this.get());
        const body = await respond.json();
        this.#id = body.id;
        return body;

    }
    
    static deleteById = async (id) => Application.Model.deleteById(Application.registry.URL_ADMIN_MEDICINES_MEDICINE , {
        medicineId : id , 
        adminId : 1,
    })

    static getById = async (id)=>{
    const respond = await Application.server.get({
        url : Application.registry.DynamicURL(Application.registry.URL_ADMIN_MEDICINES_MEDICINE , {
            medicineId : id , 
            adminId : 1,

        }),
    });
    const body = await respond.json();
    const data = body.data[0];
    const medicine = new Medicine(data);
    return medicine;
    
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