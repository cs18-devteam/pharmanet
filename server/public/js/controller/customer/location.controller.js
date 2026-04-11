import Application from "../../model/application/Application.js";
import { swal } from "../../view/swal.js";


export function activateLocations(){

    const geoLocation = window.navigator.geolocation;
    
    if(!geoLocation){
        console.warn("geo location not supported for this device");
    }else{
        geoLocation.getCurrentPosition((position=>{
            Application.longitude = position.coords.longitude;
            Application.latitude = position.coords.latitude;
            
            if(`${window.location.href}`.includes("latitude") && window.location.href?.includes("longitude")) return;
            
            // window.location.href += `?latitude=${Application.latitude}&longitude=${Application.longitude}`;
        }) , (error)=>{
            // swal({
            //     title:"Can't detect your location",
            //     text: "Location base services not be available",
            //     icon:"warning",
            // })
        });
    }
}