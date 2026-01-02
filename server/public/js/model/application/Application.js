import { swal } from "../../view/swal.js";
import ChatTemplates from "./ChatTemplates.js";


class OrderItem{
    #medicine = undefined;


    constructor(units , days , discounts , medicineId){
        if(!medicineId) throw new Error('medicine id must be defined');
        if(!units) throw new Error("number of units are must be grater than 0");
        if(discounts < 0) throw new Error("discount amount can't be negative");
        if(!days) throw new Error('number of days must be grater than 0');

        this.units = units;
        this.days = days;
        this.discounts = discounts;
        this.medicineId = +medicineId;
        
    }   

    setMedicine(medicine){
        this.#medicine = medicine;
    }

    getMedicine(){
        return this.#medicine;
    }
}


function update(){

    window.cookieStore.getAll().then(cookies=>{
        Application.pharmacyId = cookies.find(c=>c.name == "pharmacyId")?.value;
        Application.staffId = cookies.find(c=>c.name == "staffId")?.value;
        Application.userId = cookies.find(c=>c.name == "id")?.value;
        Application.ip = cookies.find(c=>c.name == "ip")?.value;
        
        
        if(Application.userId){
            fetch(`/api/v1/users/${Application.userId}`)
            .then(data => data.json())
            .then(user=>Application.user = user.results)
            .catch(e=>console.log(e));
        }
        if(Application.pharmacyId){
            fetch(`/api/v1/pharmacy/${Application.pharmacyId}`)
            .then(data => data.json())
            .then(pharmacy=>Application.pharmacy = pharmacy.results)
            .catch(e=>console.log(e));
        }
        if(Application.staffId){
            fetch(`/api/v1/staff/${Application.staffId}`)
            .then(data => data.json())
            .then(pharmacy=>Application.staff = pharmacy.results)
            .catch(e=>console.log(e));
        }
        
    })
}


export default class Application{
    static #orders = [];
    static OrderItem = OrderItem; 
    static onOrderPushCallBack = (orderItem , orderItems)=>{};
    static pharmacyId = undefined;
    static userId = undefined
    static staffId = undefined
    static ip = undefined;
    static requestPharmacyId = undefined;
    static connection = undefined;
    static connectedWith = undefined;
    static remoteOrderId = undefined;
    static #orderMedicineResultsStack = [];
    static MessageTemplates = ChatTemplates;
    static orderId = undefined;
    static pharmacy = undefined;
    static user = undefined;
    static connectedUser = undefined;
    static waitingList = [];
    static staff = undefined;


    /**
     * @type {Order[]}
     */


    /**
     * 
     * @param {OrderItem} orderItem 
     */
    static addToOrders(orderItem){
        
        
        
        this.#orders.forEach(item=>{
            if(item.medicineId == orderItem.medicineId){
                swal({
                    title:"Already added",
                })
                throw new Error("this is item is already in cart (order collection)")
            }
        });
        const [medicine] = this.#orderMedicineResultsStack.filter(m=>m.id == orderItem.medicineId);
        orderItem.setMedicine(medicine);
        this.#orders.push(orderItem);


        console.log(orderItem);
        this.onOrderPushCallBack(orderItem , this.#orders);
    }

    /**
     * 
     * @param {Function} callback 
     */
    static onPushOrderItems(callback = (orderItem , orderItems)=>{}){
        this.onOrderPushCallBack = callback;
    }

    static getOrderItems(){
        return this.#orders;
    }

    static clearOrderItems(){
        return this.#orders = [];
    }

    static removeOrderItem({medicineId  , productId}){
        this.#orders = this.#orders.filter(i=>{
            if(i.medicineId && medicineId){
                return i.medicineId != medicineId;
            }else if(i.productId && productId){
                return i.productId != productId;
            }else{
                return true;
            }
        })
    }

    static setOrderMedicineResultsStack(medicines = []){
        this.#orderMedicineResultsStack = medicines;
    }

    static async getUserData(userId){
        try{

            const results = await fetch(`/api/v1/users/${userId}`);
            const data= await results.json();
            return data.results;
        }catch(e){
            console.log(e);
            return {};
        }
    }   

    static preventReload(){
        window.addEventListener("beforeunload", function (e) {
            e.preventDefault();
            e.returnValue = ""; // required for Chrome
        });
    }

    static addToWaitingList(reqObj){
        this.waitingList.push(reqObj);
        console.log(reqObj);
    }


    static update = update;

}

Application.update();