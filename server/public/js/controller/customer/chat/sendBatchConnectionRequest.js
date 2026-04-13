import Application from "../../../model/application/Application.js";
import { openLiveConnection } from "../connection.js";
import handleConnection from "./handleConnection.js";

export async function sendConnectionRequests(orderId) {
    Application.remoteOrderId = orderId;
    Application.requestPharmacyId = Application.remotePharmacyList.splice(0, 1)[0];
    Application.connection = await openLiveConnection(); 
    Application.connection.addEventListener('message' , handleConnection);
}