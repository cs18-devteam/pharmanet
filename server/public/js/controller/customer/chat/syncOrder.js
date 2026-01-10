import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";

export default function syncOrder(){
    try{

        console.log('syncing...');
        if(!Application.remoteOrderId) throw new Error("no remote order Id");
        Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId));

    }catch(e){
        console.log(e);
    }
}
