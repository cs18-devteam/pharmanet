import { initialize } from "../../controller/pharmacy/pharmacy.dashboard.client.controller.js";
import { setContext } from "../getDashboardContext.js";

const radioBtns = document.querySelectorAll('.pharmacyDashboard > input[type=radio]');





export function changeWindowTo(id){
    Array.from(radioBtns).forEach(btn=>{
       if( btn.id != id) return;
       btn.click();
       setContext(id);
    })
}

export function switchWindow(id){
    // Array.from(radioBtns).forEach(btn=>{
    //     btn.setAttribute('checked' , false);
    // })



     Array.from(radioBtns).forEach(btn=>{
       if( btn.id != id) return;
       btn.click();
       setContext(id);
       initialize(id);
    })
}