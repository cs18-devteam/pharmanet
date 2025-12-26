import Application from "../../model/application/Application.js";
import html from "../../view/html.js";
import { openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { swal } from "../../view/swal.js";

const templateSettings = html`
    <div class="pharmacy-profile-settings">
        <div class="btn-container">
            <div class="large-view-toggle">
                <span>Full view</span>
                <input type="checkbox" id="large-view-radio">
                <label for="large-view-radio" class="large-view-radio__label" ></label>
            </div>
            <a href="/pharmacies/{pharmacyId}/staff/{staffId}/profile" class="edit" id="edit">Profile settings</a>
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



function fullViewToggleSave(state){
    window.localStorage.setItem('fullView' , state );
    updateBodyAccordingToToggle();
}


function updateBodyAccordingToToggle(){ 
    if(getFullViewToggleState() == true){
        document.body.classList.add('large-view')
    }else{
        document.body.classList.remove('large-view')
    }
}


function getFullViewToggleState(){
    return window.localStorage.getItem('fullView') == "true" ? true : false;
}
// setSidebarContent(templateSettings);
// openSidebar();

export default function init(){


    setSidebarContent(templateSettings
        .replace("{role}" , Application.staff.role || "standard")
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
        .replace("{staffId}" , Application.staff.id)
        .replace("{pharmacyId}" , Application.staff.pharmacyId)
    );
    openSidebar();
    handleSignOut();
    handleFullViewToggle();

    

}

updateBodyAccordingToToggle();

function handleFullViewToggle(){
    const fillViewToggle = document.getElementById('large-view-radio');
    const fillViewToggle__label = document.querySelector('.pharmacy-profile-settings .large-view-radio__label');

    if(!fillViewToggle) return;

    if(getFullViewToggleState() == true){
        fillViewToggle.checked =true;

    }else{
        fillViewToggle.checked =false;
    }


    fillViewToggle__label?.addEventListener('click' , ()=>{
        fullViewToggleSave(getFullViewToggleState() ? false : true);
        
        if(getFullViewToggleState()){

            swal({
                title:"Large Space Mode On",
                text:"now experience much larger space",
                icon:"success",
            })
        }else{
            swal({
                title:"Switched to Mini Space Mode",
                text:"Looks like do you prefer small space",
                icon:"success",
        })
        }
    })
}

function handleSignOut(){
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