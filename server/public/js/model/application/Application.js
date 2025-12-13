import Utilities from "../../view/application/Utilities.js";
import Dom from "./Dom.js";
import Model from "./Model.js";
import Navigator from "./Navigator.js";
import Registry from "./Registry.js";
import Server from "./Server.js";

// class Application{
//     static #Pharmacy = undefined;
//     static #User = undefined;
//     static #memory = null;
//     static #state = Application.STATE_NORMAL;
//     static registry = Registry;
//     static server = Server;
//     static dom = Dom;
//     static utilities = Utilities;
//     static navigator = Navigator;
//     static Model = Model;
//     static STATE_LOADING = "loading";
//     static STATE_NORMAL = "idle";
//     static STATE_PROCESSING = "processing";
//     static STATE_ERROR = "error";
//     static TIMEOUT = 5000; 
//     static #currentContext = null;

//     static setState(state = Application.STATE_NORMAL){
//         Application.#state = state;

//         switch(Application.#state){
//             case Application.STATE_LOADING:
//                 Application.utilities.renderSpinner(Application.STATE_LOADING);
//                 return;
//             case Application.STATE_ERROR:
//                 Application.utilities.renderSpinner(Application.STATE_ERROR);
//                 return;
//             case Application.STATE_PROCESSING:
//                 Application.utilities.renderSpinner(Application.STATE_PROCESSING);
//                 return;
//             case Application.STATE_NORMAL:
//                 Application.utilities.removeSpinner()
//                 console.log('normal');
//                 return;
//             default:
//                 Application.#state = Application.STATE_NORMAL;
//                 Application.utilities.removeSpinner()

//                 console.log('wrong state type : application state automatically set to the default Application.STATE_NORMAL');
//                 return;
//         }
//     }

//     static #run(func , state = Application.STATE_NORMAL , ...params){
//         const type = func.constructor.name;
//         if(type == "Function" ){
//             Application.setState(state);
//             const results = func(params);
//             Application.setState(Application.STATE_NORMAL);
//             return results;
            
//         }else if(type == "AsyncFunction"){
//             Application.setState(Application.STATE_PROCESSING);
//             return func(params).then((results)=>{
//                 Application.setState(Application.STATE_NORMAL)
//                 return results;
//             }); 
            
//         }
//     }

    
//     static load(func = ()=>{} , ...params){
//         return Application.#run(func , Application.STATE_LOADING);
//     }


//     static process(func = (()=>{})){
//         return Application.#run(func , Application.STATE_PROCESSING , params);        
//     }


//     static setCurrentContext(context){
//         this.#currentContext = context;
//     }

//     static setPharmacy(id){
//         Application.#Pharmacy = id;
//     }

//     static setUser(user){
//         Application.#User = user;
//     }

//     static getUser(){
//         return Application.#User;
//     }

//     static getPharmacy(){
//         return Application.#Pharmacy;
//     }

//     static save(data){
//         Application.#memory = data;
//     }

//     static data(){
//         return Application.#memory;
//     }

//     static clear(){
//         Application.#memory = undefined;
//     }

//     static redirect(url){
//         if(!url) return;
//         window.location.href = url;
//     }


//     static logout(){
//         Application.#Pharmacy = undefined;
//         Application.#User = undefined;   
//     }
// }

// export default Application;

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

window.cookieStore.getAll().then(cookies=>{
    Application.pharmacyId = cookies.find(c=>c.name == "pharmacyId").value;
    Application.staffId = cookies.find(c=>c.name == "staffId").value;
    Application.id = cookies.find(c=>c.name == "id").value;
})



export default class Application{
    static #orders = [];
    static OrderItem = OrderItem; 
    static onOrderPushCallBack = (orderItem , orderItems)=>{};
    static pharmacyId = undefined;
    static userId = undefined
    static staffId = undefined

    static #orderMedicineResultsStack = [];


    constructor(){

    }


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

    static setOrderMedicineResultsStack(medicines = []){
        this.#orderMedicineResultsStack = medicines;
    }


}