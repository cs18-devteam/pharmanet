import Application from "../../model/application/Application.js";
import html from "../../view/html.js";
import { openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { swal } from "../../view/swal.js";

const templateSettings = html`
    <div class="pharmacy-profile-settings">
        <div class="profile-info">
            <img src="{profile}" class="pharmacy-user-profile" />
            <div>{role}</div>
        </div>
        
        <div class="signout-btn-container">
            <button class="signout" id="signout">signout</button>
        </div>
        
    </div>
`;


export default function init(){
    setSidebarContent(templateSettings
        .replace("{role}" , Application.user.role || "standard")
        .replace("{profile}" , Application.user.profile));
    openSidebar();

    document.querySelector('.signout#signout').addEventListener('click' , ()=>{
    window.cookieStore.getAll().then((cookies)=>{
        cookies.forEach(c=>window.cookieStore.delete(c.name));
    })


    swal({
        title: "do you want to signout ?",
        icon: 'question',
        showCancelButton: true,
        dangerMode :true,
        confirmButtonText : "signout"
    }).then((value)=>{
        if(value.isConfirmed){
            window.location.href = "/login";

        }
    })
})

}