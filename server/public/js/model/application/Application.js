import Utilities from "../../view/application/Utilities.js";
import Dom from "./Dom.js";
import Navigator from "./Navigator.js";
import Registry from "./Registry.js";
import Server from "./Server.js";

class Application{
    static #Pharmacy = undefined;
    static #User = undefined;
    static #memory = null;
    static #state = Application.STATE_NORMAL;
    static registry = Registry;
    static server = Server;
    static dom = Dom;
    static utilities = Utilities;
    static navigator = Navigator;
    static STATE_LOADING = "loading";
    static STATE_NORMAL = "idle";
    static STATE_PROCESSING = "processing";
    static STATE_ERROR = "error";
    static TIMEOUT = 5000; 
    static #currentContext = null;

    static setState(state = Application.STATE_NORMAL){
        Application.#state = state;

        switch(Application.#state){
            case Application.STATE_LOADING:
                Application.utilities.renderSpinner(Application.STATE_LOADING);
                return;
            case Application.STATE_ERROR:
                Application.utilities.renderSpinner(Application.STATE_ERROR);
                return;
            case Application.STATE_PROCESSING:
                Application.utilities.renderSpinner(Application.STATE_PROCESSING);
                return;
            case Application.STATE_NORMAL:
                Application.utilities.removeSpinner()
                console.log('normal');
                return;
            default:
                Application.#state = Application.STATE_NORMAL;
                Application.utilities.removeSpinner()

                console.log('wrong state type : application state automatically set to the default Application.STATE_NORMAL');
                return;
        }
    }

    static #run(func , state = Application.STATE_NORMAL , ...params){
        const type = func.constructor.name;
        if(type == "Function" ){
            Application.setState(state);
            const results = func(params);
            Application.setState(Application.STATE_NORMAL);
            return results;
            
        }else if(type == "AsyncFunction"){
            Application.setState(Application.STATE_PROCESSING);
            return func(params).then((results)=>{
                Application.setState(Application.STATE_NORMAL)
                return results;
            }); 
            
        }
    }

    
    static load(func = ()=>{} , ...params){
        return Application.#run(func , Application.STATE_LOADING);
    }


    static process(func = (()=>{})){
        return Application.#run(func , Application.STATE_PROCESSING , params);        
    }


    static setCurrentContext(context){
        this.#currentContext = context;
    }

    static setPharmacy(id){
        Application.#Pharmacy = id;
    }

    static setUser(user){
        Application.#User = user;
    }

    static getUser(){
        return Application.#User;
    }

    static getPharmacy(){
        return Application.#Pharmacy;
    }

    static save(data){
        Application.#memory = data;
    }

    static data(){
        return Application.#memory;
    }

    static clear(){
        Application.#memory = undefined;
    }

    static redirect(url){
        if(!url) return;
        window.location.href = url;
    }


    static logout(){
        Application.#Pharmacy = undefined;
        Application.#User = undefined;   
    }
}

export default Application;


