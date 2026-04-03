import Application from "../../../model/application/Application.js";
import { updateStaffPermissions } from "../../../model/pharmacy/fetchStaffData.js";
import html from "../../../view/html.js";
import { openSidebar, setSidebarContent } from "../../../view/pharmacy/drawerView.js";
import { renderToast } from "../../../view/renderToast.js";

const sideBarTemplate = html`
        <!-- Permission Panel -->
    <div class="side-panel" id="permissionPanel">


        <div class="panel-header">
            <h3>Change Permissions</h3>
            <button class="close-btn" onclick="closeSidebar()">&times;</button>
        </div>

        <form class="panel-content">
            <h4>Change Member Permisions</h4>
            <input type="text" name="staffId" value="{staffId}" hidden />
            <h5>Orders Management Permisions</h5>

            <div class="permission">
            <span>Read Order Details</span>
            <label class="switch">
                <input name="readOrder" {readOrder} type="checkbox">
                <span class="slider"></span>
            </label>
            </div>

            <div class="permission">
            <span>Create Orders</span>
            <label class="switch">
                <input name="createOrder" {createOrder} type="checkbox">
                <span class="slider"></span>
            </label>
            </div>

            <div class="permission">
            <span>Update Orders</span>
            <label class="switch">
                <input name="updateOrder" {updateOrder} type="checkbox">
                <span class="slider"></span>
            </label>
            </div>

            <div class="permission">
                <span>Delete Orders</span>
                <label class="switch">
                    <input name="deleteOrder" {deleteOrder} type="checkbox">
                    <span class="slider"></span>
                </label>
                </div>

                <h5>Stock Management Permissions</h5>

                <div class="permission">
                    <span>Search  Products</span>
                    <label class="switch">
                        <input name="searchProducts" {searchProducts} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="permission">
                    <span>Create Product Stock</span>
                    <label class="switch">
                        <input name="createProducts" {createProducts} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="permission">
                    <span>Update Product </span>
                    <label class="switch">
                        <input name="updateProducts" {updateProducts} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>


                <div class="permission">
                    <span>Delete Products</span>
                    <label class="switch">
                        <input name="deleteProducts" {deleteProducts} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="permission">
                    <span>Search  Medicines</span>
                    <label class="switch">
                        <input name="searchMedicines" {searchMedicines} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="permission">
                    <span>Create Medicine Stock</span>
                    <label class="switch">
                        <input name="createMedicines" {createMedicines} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="permission">
                    <span>Update Medicine Stock </span>
                    <label class="switch">
                        <input name="updateMedicines" {updateMedicines} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>


                <div class="permission">
                    <span>Delete Medicine Stock</span>
                    <label class="switch">
                        <input name="deleteMedicines" {deleteMedicines} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>
            
        <h5>Transactions Management Permissions</h5>


                <div class="permission">
                    <span>View Transactions</span>
                    <label class="switch">
                        <input name="readTransactions" {readTransactions} type="checkbox">
                        <span class="slider"></span>
                    </label>
                </div>

        
        <h5>Staff Management Permissions</h5>

        <div class="permission">
        <span>Read Details About Member</span>
        <label class="switch">
            <input name="searchStaff" {searchStaff} type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Create Staff Member</span>
        <label class="switch">
            <input name="createStaff" {createStaff} type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Update Staff Member</span>
        <label   class="switch">
            <input name="updateStaff" {updateStaff} type="checkbox">
            <span class="slider"></span>
        </label>
        </div>


        <div class="permission">
        <span>Delete Staff Member</span>
        <label class="switch">
            <input name="deleteStaff" {deleteStaff} type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <p>Make sure you give correct permission to correct user</p>

    </form>
    </div>
  
    



`;


export async function handleEditPermission() {


    const editPermissionsBtn = document.getElementById("btn-change-perssmions_staff");
    editPermissionsBtn.addEventListener("click", () => {
        let content = sideBarTemplate;
        Object.entries(Application.currentSelectedStaffMember).forEach(([key, value]) => {
            console.log(key, value);
            content = content.replace(`{${key}}`, value ? "checked" : " ");
        })

        setSidebarContent(content.replace("{staffId}", Application.currentSelectedStaffMember.id));
        openSidebar();



        const form = document.querySelector('#permissionPanel .panel-content');
        form.addEventListener('click', async e => {
            e.stopPropagation();
            const target = e.target;
            const slider = target.closest('.switch');


            if (!slider) return;

            const formData = new FormData(form);
            const { status, results } = await updateStaffPermissions(formData);

            Application.allStaffMembers = Application.allStaffMembers.map(m => {
                if (m.id != results.id) return { ...m };
                return { ...m, ...results };
            });

            if (status == "success") {
                renderToast('staff permission updated', 'success');
            } else {
                renderToast('permission update failed');
            }

            Application.update();
        })

    })
}