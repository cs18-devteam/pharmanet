import Application from "../../model/application/Application.js";
import { swal } from "../../view/swal.js";


export function activateLocations() {

    const geoLocation = window.navigator.geolocation;

    if (!geoLocation) {
        console.warn("geo location not supported for this device");
    } else {
        geoLocation.getCurrentPosition((position => {
            Application.longitude = position.coords.longitude;
            Application.latitude = position.coords.latitude;

            if (Application.latitude, Application.longitude) {


                window.cookieStore.set("latitude", Application.latitude);
                window.cookieStore.set("longitude", Application.longitude);

                console.log(Application.latitude , Application.longitude);

            }
            // window.location.href += `?latitude=${Application.latitude}&longitude=${Application.longitude}`;
        }), (error) => {
            Application.longitude = undefined;
            Application.latitude = undefined;
            window.cookieStore.delete('latitude');
            window.cookieStore.delete('longitude');
            // swal({
            //     title:"Can't detect your location",
            //     text: "Location base services not be available",
            //     icon:"warning",
            // })
        });
    }
}