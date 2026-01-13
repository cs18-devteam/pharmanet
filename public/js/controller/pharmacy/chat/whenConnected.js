import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { renderToast } from "../../../view/renderToast.js";

export function whenConnected(message){
    const stabObj = ChatTemplates.readStablishConn(message);
            
    if(stabObj.status == "success"){
        renderToast('connected :)' , 'success');
    }else{
        renderToast("connection error" , "error");
    }
}