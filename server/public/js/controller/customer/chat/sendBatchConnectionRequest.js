import Application from "../../../model/application/Application.js";
import { removeSpinner, renderSpinner } from "../../../view/spinner.js";
import { openLiveConnection } from "../connection.js";
import handleConnection from "./handleConnection.js";

export async function sendConnectionRequests(orderId) {
    renderSpinner();
    console.log("remote Pharmacy List", Application.remotePharmacyList);

    Application.remoteOrderId = orderId;
    Application.requestPharmacyId = Application.remotePharmacyList.splice(0, 1)[0].id;
    Application.connection = await openLiveConnection();
    removeEventListener('message' , Application.connection);
    Application.connection.addEventListener('message', handleConnection);
    removeSpinner();
}