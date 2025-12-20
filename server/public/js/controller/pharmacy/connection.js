import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { activateOnSubmitMessageCallback, onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, renderMessage, renderReply, setOnSubmitMessageCallback, showIncomingMessage, spinner } from "../../view/chatbox.js";
import {renderToast} from "../../view/renderToast.js";
import Application from "../../model/application/Application.js";
import { getOrderData } from "../../view/pharmacy/orders.js";




const chatBoxBtnsAttributes = {
    prescriptionRequestBtn : {
        clickable : true,
    }
}


/**
 * @type {WebSocket}
 */

let socket = new Promise((resolve , reject)=>{
    window.cookieStore.getAll().then(cookies=>{
        const ip = cookies.find(c=>c.name == "ip")?.value;

        if(ip){
            resolve(new WebSocket(`wss://${ip}:3001`));
        }else{
            reject(undefined);
        }
    });


    
})



function listener_prescriptionRequestBtn(socket){
    // return ()=>{
        requestPrescriptionBtn.textContent = ''
        requestPrescriptionBtn.innerHTML = spinner(); 
        Application.connection.send(ChatTemplates.requestPrescriptionFromClient());

        
    // }
}


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
            Application.connection.send(ChatTemplates.requestPrescriptionFromClient());
        }else{
            console.log('please wait...');
        }
    });
    
}


function stablishConnection(socket){
    socket.send(ChatTemplates.requestConnection());
}



socket.then(socket=>socket.addEventListener('open' , ()=>{
    Application.connection = socket;
    stablishConnection(socket);
    renderToast('requesting connection');
    startSocketListening(socket);
}))


function startSocketListening(socket){
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
                console.log("customer = " , reqObj);
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
        }else if(ChatTemplates.isSyncRequest(message)){
            const {data} = ChatTemplates.decodeString(message);
            if(data.oderId){
                getOrderData(data.orderId).then(data=>{
                    console.log(data);
                })
            }

        }
    })

}


setOnSubmitMessageCallback((e , value)=>{
    e.preventDefault();
    console.log(ChatTemplates.message(value));
    Application.connection.send(ChatTemplates.message(value));
    renderReply(value);
})

activateOnSubmitMessageCallback();
 