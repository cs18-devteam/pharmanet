import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { activateOnSubmitMessageCallback, onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, renderMessage, renderReply, setOnSubmitMessageCallback, showIncomingMessage, spinner } from "../../view/chatbox.js";
import {renderToast} from "../../view/renderToast.js";
import Application from "../../model/application/Application.js";




const chatBoxBtnsAttributes = {
    prescriptionRequestBtn : {
        clickable : true,
    }
}




/**
 * @type {WebSocket}
 */
const socket = new WebSocket('ws://localhost:3001');



// function listener_prescriptionRequestBtn(socket){
//     // return ()=>{
//         requestPrescriptionBtn.textContent = ''
//         requestPrescriptionBtn.innerHTML = spinner(); 
//         socket.send(ChatTemplates.requestPrescriptionFromClient());

        
//     // }
// }


/**
 * 
 * @param {WebSocket} socket 
 */
function activateChatBoxButtons(){

    const requestPrescriptionBtn = document.querySelector(".prescription .request-prescription-btn");

    requestPrescriptionBtn?.addEventListener('click' , ()=>{

        if(chatBoxBtnsAttributes.prescriptionRequestBtn.clickable){
            requestPrescriptionBtn.textContent = ''
            requestPrescriptionBtn.innerHTML = spinner(); 
            socket.send(ChatTemplates.requestPrescriptionFromClient());
        }else{
            console.log('please wait...');
        }
    });
    
}


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
            activateChatBoxButtons(socket);
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

    }else if(ChatTemplates.isStatPrescription(message)){
        const {data} = ChatTemplates.decodeString(message);

        if(data.status == "success"){
            const prescription = document.querySelector(".pharmacyDashboard .dashboards .container .right .prescription");

            const image = document.createElement('img');
            image.setAttribute('class' , prescription.getAttribute('class'));
            image.src = `/${data.path}`;
            image.addEventListener('load' , ()=>{
                prescription.replaceWith(image);
            })
        }
    }
})

setOnSubmitMessageCallback((e , value)=>{
    e.preventDefault();
    socket.send(ChatTemplates.message(value));
    renderReply(value);
})

activateOnSubmitMessageCallback();
 