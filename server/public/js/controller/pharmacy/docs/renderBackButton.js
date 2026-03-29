import renderDocsList from "./renderDocsList.helper.js";
import reports from "./reports.js";

export default function renderBackButton(container , editor){
    const button = document.createElement("button");
    button.classList.add("back_button");
    button.textContent = "back"
    button.addEventListener('click' , ()=>{
        renderDocsList(container , reports);
    })

    editor.insertAdjacentElement("beforeend" , button);

    
}