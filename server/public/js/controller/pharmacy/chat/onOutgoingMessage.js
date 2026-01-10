import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import PharmacyChatbox from "../../../view/pharmacy/PharmacyChatBox.js";
// import * as chatBox from "../../../view/chatbox.js";

export function startListingOutgoingMessages(){
     PharmacyChatbox.handleInputMessage((value)=>{
        Application.connection.send(ChatTemplates.message(value));
    })

    chatBox.activateOnSubmitMessageCallback();
}