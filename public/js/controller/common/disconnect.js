import Application from "../../model/application/Application.js";

export function disconnect(){
    Application.remoteOrderId = undefined;
    Application.connectedWith = undefined;
    Application.connection = undefined;
}