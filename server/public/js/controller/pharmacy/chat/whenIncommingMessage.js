import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { renderMessage } from "../../../view/chatbox.js";

export function whenIncomingMessage(message){
    const msgObj = ChatTemplates.readMessage(message)
    renderMessage(msgObj.message);
}