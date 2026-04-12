
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
    static #STAT_PRSC = "RES_PHR="
    static #MINOR_ERROR = "MINOR_ERROR="
    static #DISCONNECT="DCN="
    static #HEALTH="HL="


    static message({msg ,from , to , toId , fromId}){
            return `${this.#MSG}${JSON.stringify({
                message: msg,
                type: from,
                to :to,
                id : fromId,
                toId : toId,
            })}`
        
    } 

    static healthCheck(){
        return `${this.#HEALTH}${JSON.stringify({})}`
    }

    static getIdFromHealthCheck(message){
        return JSON.parse(message.replace(this.#HEALTH , ""))?.id;
    }

    static isHealthCheck(message){
        return message.startsWith(this.#HEALTH);
    }


    static disconnect(){
        return `${this.#DISCONNECT}${JSON.stringify({
            ...this.defaultOptions() , 
        })}`
    }




    static acceptClient(isAccept , clientId){
        return `${this.#RES_CLIENT}${JSON.stringify({
            accept: isAccept,
            customerId : clientId,
            // id : Application?.pharmacyId,
            type :"pharmacy"
        })}`
    }


    static requestPharmacy(pharmacyId){
        return `${this.#REQ_PHR}${JSON.stringify({
            pharmacyId , 
            customerId : Application?.userId}
        )}`
    }


    static decodeString(message){
        try{

            const opcode = message.split('=')[0];
            
            
            return {
                opcode,
                data : JSON.parse(message.replace(`${opcode}=` , '')),
            }
        }catch(e){
            return {
                opcode :"ERROR",
                data : {
                    message:"frame can not decode",
                }
            }
        }
    }


    static disconnect(){
        return `${this.#DISCONNECT}${JSON.stringify({
            
        })}`
    }

    static requestConnection(){
        if(Application?.pharmacyId){

            return `${this.#STAB_CONN}${JSON.stringify({
                type:'pharmacy',
                id : Application?.pharmacyId,
            })}`
        }else{
            return `${this.#STAB_CONN}${JSON.stringify({
                type:'customer',
                id : Application?.userId,
            })}`

        }
    }

    static minorError({msg , from , to , toId , fromId} ){
        return `${this.#MINOR_ERROR}${JSON.stringify({
                error: msg,
                message: msg,
                type: from,
                to :to,
                id : fromId,
                toId : toId,
            })}`
    }

    static createConnection(status){
        return `${this.#STAB_CONN}${JSON.stringify({
            status: status ? "success" : "error",
        })}`
        

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
            id : Application?.pharmacyId,
            toId : Application?.connectedWith,
        })}`
    }

    static statusPrescription(path){
        return `${this.#STAT_PRSC}${JSON.stringify({
            type:"customer",
            to : "pharmacy",
            id : Application?.userId,
            toId : Application?.connectedWith,
            path : path,
        })}`
    }

    static readChatBoxAcceptRequestFromServer(message){
        return JSON.parse(message.replace(this.#RES_CLIENT , ''));
    }

    static chatBoxAcceptRequestFromServerToClient(accept ,pharmacyId , customerId){
        return `${this.#RES_CLIENT}${JSON.stringify({
            pharmacyId ,
            customerId , 
            accept ,
            from:"pharmacy",
            to:"customer",
        })}`
    }

    static requestPrescription(){
        return `${this.#REQ_PRSC}${JSON.stringify({
            type:"pharmacy",
            to : "customer",
            id : Application?.pharmacyId,
            toId : Application?.connectedWith,
        })}`
    }

    static paymentStatus(status , method='card'){
        return `${this.#STAT_PAY}${JSON.stringify({
            status,
            customerId : Application?.userId,
            type :"customer",
            method: method,
            to : 'pharmacy',
            toId : Application?.connectedWith,
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
        return message.startsWith(this.#RES_CLIENT);
    }

    static isRequestConnection(message){
        return message.startsWith(this.#STAB_CONN);
    }

    static isResponseFromPharmacy(message){
        return message.startsWith(this.#RES_PHR);
    }

    static isConnectionResponse(message){
        return message.startsWith(this.#STAB_CONN)
    }

    static isRequestPayment(message){
        return message.startsWith(this.#REQ_PAY)
    }

    static readRequestPayment(message){
        return JSON.parse(message.replace(this.#REQ_PAY , ''));
    }

    static readMessage(message){
        return  JSON.parse(message.replace(this.#MSG , ''));
    }
    static readPharmacyRequest(message){
        return  JSON.parse(message.replace(this.#REQ_PHR , ''));
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

}


module.exports = ChatTemplates;