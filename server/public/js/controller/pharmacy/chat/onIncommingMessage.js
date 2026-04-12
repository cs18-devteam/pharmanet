import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { renderChatBox } from "../../../view/pharmacy/chat/renderChatbox.js";
import { onDisconnect } from "./onDisconnect.js";
import { whenChatBoxRequest } from "./whenChatboxRequest.js";
import { whenConnected } from "./whenConnected.js";
import { whenIncomingMessage } from "./whenIncommingMessage.js";
import { whenStatPrescription } from "./whenStatPescription.js";
import { whenSyncRequest } from "./whenSyncRequest.js";

export function startSocketListening(socket){
    socket.addEventListener('message' , (msgEvent)=>{
        const message = msgEvent.data;
        console.log(message);
        if(ChatTemplates.isHealthCheck(message)){
            return Application.connection.send(ChatTemplates.healthString())
        }

        if(ChatTemplates.isConnectionResponse(message)){
            whenConnected(message)
        }

        if(ChatTemplates.isChatBoxRequestFromClient(message)){
            whenChatBoxRequest(socket , message);

        }else if(ChatTemplates.isMessage(message)){
            whenIncomingMessage(message);

        }else if(ChatTemplates.isStatPrescription(message)){
            whenStatPrescription(message);
        }else if(ChatTemplates.isSyncRequest(message)){
            whenSyncRequest(message);

        }else if(ChatTemplates.isDisconnect(message)){
            onDisconnect();
        }
    })

}

