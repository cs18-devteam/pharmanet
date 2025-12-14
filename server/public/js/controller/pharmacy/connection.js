import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { activateOnSubmitMessageCallback, onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, renderMessage, renderReply, setOnSubmitMessageCallback, showIncomingMessage } from "../../view/chatbox.js";
import {renderToast} from "../../view/renderToast.js";
import Application from "../../model/application/Application.js";




/**
 * @type {WebSocket}
 */
const socket = new WebSocket('ws://localhost:3001');



function stablishConnection(){
    socket.send(ChatTemplates.requestConnection());
}



socket.addEventListener('open' , ()=>{
    stablishConnection();
    renderToast('requesting connection')
})


socket.addEventListener('message' , (msgEvent)=>{
    const message = msgEvent.data;
    console.log(message);

    if(ChatTemplates.isConnectionResponse(message)){
        const stabObj = ChatTemplates.readStablishConn(message);
        
        if(stabObj.status == "success"){
            renderToast('connected :)' , 'success');
        }else{
            renderToast("connection error" , "error");
        }
    }


    if(ChatTemplates.isChatBoxRequestFromClient(message)){
        const reqObj = ChatTemplates.readChatBoxRequest(message);

        showIncomingMessage(reqObj);

        onAcceptIncomingMessage(()=>{
            Application.connectedWith = reqObj.customerId;
            socket.send(ChatTemplates.acceptClient(true , reqObj.customerId));
            changeWindowTo('chats');
        })

        onRejectIncomingMessage(()=>{
            socket.send(ChatTemplates.acceptClient(false , reqObj.customerId));
        })

        onAnyCaseIncomingMessage(()=>{
            removeIncomingMessage();
        })

    }else if(ChatTemplates.isMessage(message)){
        const msgObj = ChatTemplates.readMessage(message)
        renderMessage(msgObj.message);
    }
})

setOnSubmitMessageCallback((e , value)=>{
    e.preventDefault();
    socket.send(ChatTemplates.message(value));
    renderReply(value);
})

activateOnSubmitMessageCallback();
