import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { deleteOrder } from "../../../model/pharmacy/orders.js";
import { renderWaitingList } from "../../../view/pharmacy/chat/renderWaitingList.js";
import PharmacyChatbox from "../../../view/pharmacy/PharmacyChatBox.js";
import { renderToast } from "../../../view/renderToast.js";
import { swal } from "../../../view/swal.js";
import { disconnect } from "./disconnectNoticeHandler.js";

export async function onDisconnect() {
    PharmacyChatbox.renderCloseAndSaveOrder();
    disconnect();
    PharmacyChatbox.disconnect();
    PharmacyChatbox.clearHistory();

}



