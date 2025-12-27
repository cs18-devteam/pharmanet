import html from "../../../view/html.js";
import { openSidebar, setSidebarContent } from "../../../view/pharmacy/drawerView.js";

const sideBarTemplate = html`
        <!-- Permission Panel -->
    <div class="side-panel" id="permissionPanel">
    <div class="panel-header">
        <h3>Change Permissions</h3>
        <button class="close-btn" onclick="closeWindow('permissionPanel')">&times;</button>
    </div>

    <div class="panel-content">
        <h4>Change Member Permisions</h4>
        <h5>Orders Management Permisions</h5>

        <div class="permission">
        <span>Read Order Details</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Create Orders</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Update Orders</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Delete Orders</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

            <h5>Stock Management Permissions</h5>

        <div class="permission">
        <span>Search Medicine & Products</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Create Product & Medicine Stock</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Update Product & Medicine Stock</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>


        <div class="permission">
        <span>Delete Products & Medicine</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        
        <p>Make sure you give correct permission to correct user</p>
        <h5>Staff Management Permissions</h5>

        <div class="permission">
        <span>Read Details About Member</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Create Staff Member</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <div class="permission">
        <span>Update Staff Member</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>


        <div class="permission">
        <span>Delete Staff Member</span>
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        </div>

        <p>Make sure you give correct permission to correct user</p>

    </div>
    </div>



`;


export async function handleEditPermission() {
    const editPermissionsBtn = document.getElementById("btn-change-perssmions_staff");
    editPermissionsBtn.addEventListener("click" , ()=>{
        setSidebarContent(sideBarTemplate);
        openSidebar();

    })
}