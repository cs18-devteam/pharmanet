let defaultContext = undefined;
const radioBtns = document.querySelectorAll('.pharmacyDashboard > input[type=radio]');
Array.from(radioBtns).forEach(btn=>{
    if(btn.hasAttribute("checked")) defaultContext = btn.id;
})


export default function getDashboardContext(){
    return defaultContext || "orders";
}




export function setContext(id){
    defaultContext = id;
}