import Application from "./Application.js";

class ChatTemplates{
    static #MSG = "MSG=";
    static #RES_CLIENT="RES_CLIENT=";
    static #REQ_PHR="REQ_PHR=";
    static #STAB_CONN = "STABLISH=";
    static #REQ_PAY = "REQ_PAY=";
    static #REQ_CLIENT = "REQ_CLIENT="
    static #REQ_PRSC = "REQ_PRSC="
    static #STAT_PAY = "STAT_PAY="
    static #RES_PHR = "RES_PHR="
    static #STAT_PRSC = "STAT_PRSC="
    static requestPrescription = this.#REQ_PRSC.replace('=','');
    static #MINOR_ERROR = "MINOR_ERROR="
    static #SYNC = "SYNC="



    static message(msg){
        if(Application.pharmacyId){
            return `${this.#MSG}${JSON.stringify({
                message: msg,
                type: 'pharmacy',
                to :"customer",
                id : Application.pharmacyId,
                toId : Application.connectedWith,
            })}`
        }else{
            return `${this.#MSG}${JSON.stringify({
                message: msg,
                type: 'customer',
                to :"pharmacy",
                id : Application.userId,
                toId : Application.connectedWith,
            })}`
        }
    } 


    static acceptClient(isAccept , clientId){
        return `${this.#RES_CLIENT}${JSON.stringify({
            accept: isAccept,
            customerId : clientId,
            id : Application.pharmacyId,
            type :"pharmacy"
        })}`
    }

    static defaultOptions(){
        return {
            type : Application.pharmacyId ? "pharmacy" : "customer",
            to : Application.pharmacyId ? "customer" : "pharmacy",
            toId : Application.connectedWith,
            id : Application.pharmacyId ? Application.pharmacyId : Application.userId,
            
        }
    }


    static requestPharmacy(pharmacyId){
        console.log({userID : Application.userId});



        return `${this.#REQ_PHR}${JSON.stringify({
            pharmacyId , 
            customerId : Application.userId}
        )}`
    }

    static isMinorError(message){
        return message.startsWith(this.#MINOR_ERROR);
    }

    static requestConnection(){
        if(Application.pharmacyId){

            return `${this.#STAB_CONN}${JSON.stringify({
                type:'pharmacy',
                id : Application.pharmacyId,
            })}`
        }else{
            return `${this.#STAB_CONN}${JSON.stringify({
                type:'customer',
                id : Application.userId,
            })}`

        }
    }

    static syncConnection(orderId){
        return `${this.#SYNC}${JSON.stringify({
            id : orderId,
        })}`
    }



    static createConnection(){
        // const stabObj = JSON.parse(message.replace("STABLISH=",''));

        if(stabObj.type == "pharmacy"){
                // connectedPharmacies[stabObj.id] = (new PharmacyClient(stabObj.id ,client))
                return `${this.#STAB_CONN}${JSON.stringify({
                    status:"success",
                })}`
        }else if(stabObj.type == "customer"){
                // connectedCustomers[stabObj.id] = (new CustomerClient(stabObj.id , client));
                return `${this.#STAB_CONN}${JSON.stringify({
                    status:"success",
                })}`;
        }

    }

    static requestPayment(customerId , amount){
        return `${this.#REQ_PAY}${JSON.stringify({
            from : customerId,
            amount: amount,
        })}`
    }

    static requestPharmacyChatBox(customerId){
        return `${this.#REQ_CLIENT}${JSON.stringify({
            customerId, 
        })}`
    }

    static requestPrescription(){
        return `${this.#REQ_PRSC}${JSON.stringify({
            type:"pharmacy",
            to : "customer",
            id : Application.pharmacyId,
            toId : Application.connectedWith,
        })}`
    }

    static statusPrescription(path,status){
        return `${this.#STAT_PRSC}${JSON.stringify({
            type:"customer",
            to : "pharmacy",
            id : Application.userId,
            toId : Application.connectedWith,
            path : path,
            status ,
        })}`
    }

    static readChatBoxAcceptRequestFromServerToClient(message){
        return JSON.parse(message.replace(this.#RES_CLIENT , ''))
    }

    static requestPrescriptionFromClient(){
        return `${this.#REQ_PRSC}${JSON.stringify({
            ...this.defaultOptions(),
        })}`
    }


    static requestPrescription(){
        return `${this.#REQ_PRSC}${JSON.stringify({
            type:"pharmacy",
            to : "customer",
            id : Application.pharmacyId,
            toId : Application.connectedWith,
        })}`
    }

    static paymentStatus(status , method='card'){
        return `${this.#STAT_PAY}${JSON.stringify({
            status,
            customerId : Application.userId,
            type :"customer",
            method: method,
            to : 'pharmacy',
            toId : Application.connectedWith,
        })}`
    }

    static responseChatAcceptFromPharmacy(isAccept , pharmacyId){
        return `${this.#RES_PHR}${JSON.stringify({
            accept : isAccept,
            pharmacyId : pharmacyId,
        })}`
    }

    static isChatBoxRequestFromClient(message){
        return message.startsWith(this.#REQ_CLIENT);
        
    }
    static isStatPrescription(message){
        return message.startsWith(this.#STAT_PRSC);
        
    }

    static isMessage(message){
        return message.startsWith(this.#MSG);
    }

    static isPharmacyRequest(message){
        return message.startsWith(this.#REQ_PHR);
    }

    static isAcceptClient(message){
        return message.startsWith(this.#REQ_CLIENT);
    }

    static isRequestConnection(message){
        return message.startsWith(this.#STAB_CONN);
    }

    static isResponseFromPharmacy(message){
        return message.startsWith(this.#RES_PHR);
    }

    static isChatBoxResponseFromPharmacy(message){
        return message.startsWith(this.#RES_CLIENT);
    }

    static isConnectionResponse(message){
        return message.startsWith(this.#STAB_CONN)
    }

    static isRequestPayment(message){
        return message.startsWith(this.#REQ_PAY)
    }

    static isPharmacyAccept(message){
        return message.startsWith(this.#RES_PHR)
    }

    static readRequestPayment(message){
        return JSON.parse(message.replace(this.#REQ_PAY , ''));
    }

    static readPrescriptionStat(message){
        return JSON.parse(message.replace(this.#STAT_PRSC , ''));
    }

    static readMessage(message){
        return  JSON.parse(message.replace(this.#MSG , ''));
    }
    static readPharmacyRequest(message){
        return  JSON.parse(message.replace(this.#RES_PHR , ''));
    }

    static readAcceptClient(message){
        return JSON.parse(message.replace(this.#REQ_CLIENT , ''));
    }

    static readStablishConn(message){
       return  JSON.parse(message.replace(this.#STAB_CONN , ''));
    }

    static readResponseFromPharmacy(message){
       return  JSON.parse(message.replace(this.#RES_PHR , ''));
    }
    
    static readChatBoxRequest(message){
        return  JSON.parse(message.replace(this.#REQ_CLIENT , ''));
    }

    static readStatPrescription(message){
        return  JSON.parse(message.replace(this.#STAT_PRSC , ''));
    }   

    static decodeString(message){
        const opcode = message.split('=')[0];
        return {
            opcode,
            data : JSON.parse(message.replace(`${opcode}=` , '')),
        }
    }
}
export default ChatTemplates; 