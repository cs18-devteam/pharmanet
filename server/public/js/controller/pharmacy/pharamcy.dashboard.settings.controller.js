import Application from "../../model/application/Application.js";
import html from "../../view/html.js";
import { openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { swal } from "../../view/swal.js";

const templateSettings = html`
    <div class="pharmacy-profile-settings">
        <div class="btn-container">
            <button class="edit" id="edit">Profile settings</button>
            <button class="signout" id="signout">signout</button>
        </div>
        
        <div class="profile-info">
            <img src="{profile}" class="pharmacy-user-profile" />
            <div>{role}</div>
        </div>

        <div class="basic-info info">
            <div>{firstName} {lastName}</div>
            <div>{email}</div>
        </div>


        <div class="location-info info">
            <h3>location info</h3>
            <div>{addressNo}</div>
            <div>{street} , {town}</div>
            <div>{province}</div>
        </div>

        <div class="banking-info info">
            <h3>Banking info</h3>
            <div>{accountNo}</div>
            <div>{Bank}</div>
            <div>{Branch}</div>
        </div>

        <div class="danger-zone">
            <h2 class="danger-zone__heading--2">danger zone</h2>
            <h3 class="danger-zone__heading--3">Delete pharmacy & Account</h3>
            <p class="danger-zone__para">This will permanently delete your pharmacy account and all related data, including products, orders, transactions, and staff details. Your account will be converted back to a customer account. This action is irreversible and deleted data cannot be recovered.</p>


            <div class="pharmacy_acc_delete_agreement__box">

                <input type="checkbox" id="pharmacy_acc_delete_agreement__checkbox">
                
                <label class="pharmacy_acc_delete_agreement__text" for="pharmacy_acc_delete_agreement__checkbox">
                        I understand and want to delete. I know my data will be permanently lost.
                </label>
                
                <button id="pharmacy_acc_delete_agreement" data-pharmacy_id="{pharmacyId}" >Understood! , I want to Delete</button>
            </div>
        </div>


        
    </div>
`;

// setSidebarContent(templateSettings);
// openSidebar();

export default function init(){

    setSidebarContent(templateSettings
        .replace("{role}" , Application.user.role || "standard")
        .replace("{profile}" , Application.user.profile)
        .replace("{firstName}" , Application.user.firstName)
        .replace("{lastName}" , Application.user.lastName)
        .replace("{email}" , Application.user.email)
        .replace("{addressNo}" , Application.user.addressNo)
        .replace("{street}" , Application.user.street)
        .replace("{town}" , Application.user.town)
        .replace("{province}" , Application.user.province)
        .replace("{accountNo}" , Application.user.accountNo || "not available")
        .replace("{bank}" , Application.user.bank)
        .replace("{bankBranch}" , Application.user.bankBranch)
    );
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