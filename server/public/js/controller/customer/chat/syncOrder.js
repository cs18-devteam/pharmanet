import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { customerSyncOrder } from "../../../view/customer/syncOrder.js";

export default function syncOrder(){
    try{

        console.log('syncing...');
        if(!Application.remoteOrderId) throw new Error("no remote order Id");
        Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId));
        customerSyncOrder();

    }catch(e){
        console.log(e);
    }
}
