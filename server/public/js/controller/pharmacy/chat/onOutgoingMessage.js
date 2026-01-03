import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import * as chatBox from "../../../view/chatbox.js";

export function startListingOutgoingMessages(){
    chatBox.setOnSubmitMessageCallback((e , value)=>{
        e.preventDefault();
        Application.connection.send(ChatTemplates.message(value));
        chatBox.renderReply(value);
    })

    chatBox.activateOnSubmitMessageCallback();
}