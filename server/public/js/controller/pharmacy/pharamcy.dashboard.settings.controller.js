import Application from "../../model/application/Application.js";
import { deletePharmacy } from "../../model/pharmacy/deletePharmacy.js";
import html from "../../view/html.js";
import { openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { renderText } from "../../view/renderText.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";

const templateSettings = html`
    <div class="pharmacy-profile-settings">
        <div class="btn-container">
            <div class="large-view-toggle">
                <span>Full view</span>
                <input type="checkbox" id="large-view-radio">
                <label for="large-view-radio" class="large-view-radio__label" ></label>
            </div>
            <div id="full_screen_mode__button">

                <span>full Screen</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

            </div>
            <a href="/pharmacies/{pharmacyId}/staff/{staffId}/profile" class="edit" id="edit">Profile settings</a>
            <button class="signout" id="signout">signout</button>
        </div>
        
        <div class="profile-info">
            <img src="{profile}" class="pharmacy-user-profile" />
            <div>{role}</div>
        </div>

        <div class="basic-info info">
            <div style="color:var(--color-green-01); text-transform : capitalize;">( {pharmacyName} )</div>
            <div>{firstName} {lastName}</div>
            <div>{email}</div>
        </div>


        <div class="location-info info">
            <h3>location info</h3>
            <div>{addressNo}</div>
            <div>{street} , {town}</div>
            <div>{province}</div>
        </div>
<!-- 
        <div class="banking-info info">
            <h3>Banking info</h3>
            <div>{accountNo}</div>
            <div>{bank}</div>
            <div>{branch}</div>
        </div> -->

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



function fullViewToggleSave(state) {
    window.localStorage.setItem('fullView', state);
    updateBodyAccordingToToggle();
}


function updateBodyAccordingToToggle() {
    if (getFullViewToggleState() == true) {
        document.body.classList.add('large-view')
    } else {
        document.body.classList.remove('large-view')
    }
}


function getFullViewToggleState() {
    return window.localStorage.getItem('fullView') == "true" ? true : false;
}
// setSidebarContent(templateSettings);
// openSidebar();

export default function init() {
    setSidebarContent(templateSettings
        .replace("{role}", Application.staff?.role || "standard")
        .replace("{profile}", Application.user?.profile || "-")
        .replace("{firstName}", Application.user?.firstName || "-")
        .replace("{lastName}", Application.user?.lastName || "-")
        .replace("{email}", Application.user?.email || "-")
        .replace("{addressNo}", Application.pharmacy?.addressNo || "-")
        .replace("{street}", Application.pharmacy.street || "-")
        .replace("{town}", Application.pharmacy?.town || "-")
        .replace("{province}", Application.pharmacy?.province || "-")
        .replace("{accountNo}", Application.user?.accountNo || "not available")
        .replace("{bank}", Application.user?.bank || "-")
        .replace("{branch}", Application.user?.bankBranch || "-")
        .replace("{staffId}", Application.staff?.id || "-")
        .replace("{pharmacyId}", Application.staff?.pharmacyId || "-")
        .replace("{pharmacyName}", Application.pharmacy?.name || "-")
    );
    openSidebar();
    handleSignOut();
    handleFullViewToggle();
    handleFullScreenMode();
    handleDeletePharmacyOperation();



}

updateBodyAccordingToToggle();

function handleFullViewToggle() {
    const fillViewToggle = document.getElementById('large-view-radio');
    const fillViewToggle__label = document.querySelector('.pharmacy-profile-settings .large-view-radio__label');

    if (!fillViewToggle) return;

    if (getFullViewToggleState() == true) {
        fillViewToggle.checked = true;

    } else {
        fillViewToggle.checked = false;
    }


    fillViewToggle__label?.addEventListener('click', () => {
        fullViewToggleSave(getFullViewToggleState() ? false : true);

        if (getFullViewToggleState()) {

            swal({
                title: "Large Space Mode On",
                text: "now experience much larger space",
                icon: "success",
            })
        } else {
            swal({
                title: "Switched to Mini Space Mode",
                text: "Looks like do you prefer small space",
                icon: "success",
            })
        }
    })
}

function handleSignOut() {
    document.querySelector('.signout#signout').addEventListener('click', () => {
        swal({
            title: "do you want to signout ?",
            icon: 'question',
            showCancelButton: true,
            dangerMode: true,
            confirmButtonText: "signout"
        }).then((value) => {
            if(value.isConfirmed){
                window.cookieStore.getAll().then((cookies) => {
                    cookies.forEach(c => window.cookieStore.delete(c.name));
                })
                swal({
                    title:"Signout Successful",
                    icon:"success",
                }).then(()=>{
                    window.location.href = "/login";
                })

            }

        })

    })

}

function handleFullScreenMode() {
    document.getElementById("full_screen_mode__button").addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen()

        }
    })

    document.body.addEventListener('fullscreenchange', (e) => {
        if (document.fullscreenElement) {
            document.body.classList.add("full_screen");
        } else {
            document.body.classList.remove("full_screen");
        };
    })
}

function handleDeletePharmacyOperation() {
    document.getElementById('pharmacy_acc_delete_agreement')?.addEventListener('click', e => {
        const container = document.createElement('div');
        container.classList.add("deletion-notice");

        document.body.insertAdjacentElement('beforeend', container);

        container.insertAdjacentHTML("afterbegin", html`
    <div class="notice-wrapper">
        <div class="notice-card">
            <h1>We’re sorry to see you here</h1>
            
            <p class="intro">
                We truly appreciate your support and trust in our system.
                It’s always difficult to say goodbye.
            </p>
            
            <div class="warning-box">
                <p>
                    This action will <strong>only delete your Pharmacy System</strong>.
                </p>
                <ul>
                    <li>All pharmacy details will be permanently removed</li>
                    <li>Your account will be converted to a normal user account</li>
                    <li>You may create a new pharmacy account later</li>
                    <li><strong>Previous data cannot be restored</strong></li>
                </ul>
            </div>
            
            <p class="final-note">
                Once deleted, everything related to your pharmacy is gone forever.
                Please make sure this is what you want.
            </p>
            
            <div class="actions">
                <button class='btn-back' id="pharmacy-account-final-final-final-delete-btn-back" >I don't want to delete</button>
                <button class="btn-danger" id="pharmacy-account-final-final-final-delete-btn">
                    Continue & Delete Account
                </button>
            </div>
        </div>
    </div>`)

        document.getElementById('pharmacy-account-final-final-final-delete-btn').addEventListener('click', async () => {
            container.innerHTML = '';

            renderSpinner();
            const results = await deletePharmacy();
            removeSpinner();

            if (results.status == "success") {
                renderText("Bye , See you again ❤️");
                setTimeout(()=>{
                    window.location.href = "/login";
                } , 5000);
            } else {
                swal({
                    icon: 'error',
                    title: "some thing went wrong",
                }).then(() => {
                    container.remove();
                })
            }


        })

        document.getElementById("pharmacy-account-final-final-final-delete-btn-back")?.addEventListener("click" , ()=>{
            container.classList.remove("deletion-notice");
            container.remove();
        })
    })
}



