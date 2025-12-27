import { openSidebar, setSidebarContent } from "../../../view/pharmacy/drawerView.js";
import html from "./../../../view/html.js";


const sideBarTemplate = html`
    <div class="create_new_member">
        <h2 class="create_new_member__heading">Create new member</h2>


        <h3 class="create_new_member__heading--3">basic info</h3>

        <div class="fields_row">

            <div class="field">
                <label for="new_member_first_name">first name</label>
                <p>Enter the staff member’s given name</p>
                <input type="text" id="new_member_first_name">
            </div>
            <div class="field">
                <label for="new_member_last_name">last name</label>
                <p>Enter the staff member’s family name.</p>
                <input type="text" id="new_member_last_name">
            </div>
        </div>

        <div class="field">
                <label for="new_member_mobile_number">Contact number</label>
                <p>Enter an active phone number for official contact.</p>
                <input type="text" id="new_member_mobile_number">
        </div>

        <div class="field">
                <label for="new_member_email">email</label>
                <p>Provide a valid email address for login and communication.</p>
                <input type="text" id="new_member_email">
        </div>

        <h3 class="create_new_member__heading--3">location info</h3>

        <div class="fields_row">

            <div class="field">
                <label for="new_member_address_no">Address No</label>
                <p>House or building number.</p>
                <input type="text" id="new_member_address_no">
            </div>
            <div class="field">
                <label for="new_member_address_street">Street</label>
                <p>Street name or road.</p>
                <input type="text" id="new_member_address_street">
            </div>
        </div>
        <div class="fields_row">

            <div class="field">
                <label for="new_member_address_town">Town</label>
                <p>City or town of residence.</p>
                <input type="text" id="new_member_address_town">
            </div>
            <div class="field">
                <label for="new_member_address_province">Province</label>
                <p>Enter the province.</p>
                <input type="text" id="new_member_address_province">
            </div>
        </div>

        <div class="field">
            <label for="new_member_role">Role</label>
            <p>Select the staff member’s role and system access level.</p>
            <select type="text" id="new_member_role">
                <option name="pharmacist">pharmacist</option>
                <option name="cashier">Cashier</option>
            </select>
        </div>


        <button class="save">Create</button>

    </div>

`

export async function handleCreateStaff() {
    const createStaffButton = document.getElementById("add-new-staff");
    createStaffButton.addEventListener('click' , ()=>{
        setSidebarContent(sideBarTemplate);
        openSidebar();
    })
    
}