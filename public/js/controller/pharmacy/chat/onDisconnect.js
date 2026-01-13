import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import PharmacyChatbox from "../../../view/pharmacy/PharmacyChatBox.js";
import { renderToast } from "../../../view/renderToast.js";

export async function onDisconnect() {
    PharmacyChatbox.disconnect();
}