import Application from "../../../model/application/Application.js";
import { createStaff } from "../../../model/pharmacy/fetchStaffData.js";
import {
  closeSidebar,
  openSidebar,
  setSidebarContent,
} from "../../../view/pharmacy/drawerView.js";
import { swal } from "../../../view/swal.js";
import html from "./../../../view/html.js";

const sideBarTemplate = html`
  <form class="create_new_member" id="create_new_pharmacy_staff_member">
    <h2 class="create_new_member__heading">Create new member</h2>

    <h3 class="create_new_member__heading--3">basic info</h3>

    <div class="fields_row">
      <div class="field">
        <label for="new_member_first_name">first name</label>
        <p>Enter the staff member’s given name</p>
        <input type="text" name="firstName" id="new_member_first_name" />
      </div>
      <div class="field">
        <label for="new_member_last_name">last name</label>
        <p>Enter the staff member’s family name.</p>
        <input type="text" name="lastName" id="new_member_last_name" />
      </div>
    </div>

    <div class="field">
      <label for="new_member_mobile_number">Contact number</label>
      <p>Enter an active phone number for official contact.</p>
      <input type="text" name="contactNo" id="new_member_mobile_number" />
    </div>

    <div class="field">
      <label for="new_member_email">email</label>
      <p>Provide a valid email address for login and communication.</p>
      <input type="text" name="email" id="new_member_email" />
    </div>

    <h3 class="create_new_member__heading--3">location info</h3>

    <div class="fields_row">
      <div class="field">
        <label for="new_member_address_no">Address No</label>
        <p>House or building number.</p>
        <input type="text" name="addressNo" id="new_member_address_no" />
      </div>
      <div class="field">
        <label for="new_member_address_street">Street</label>
        <p>Street name or road.</p>
        <input type="text" name="street" id="new_member_address_street" />
      </div>
    </div>
    <div class="fields_row">
      <div class="field">
        <label for="new_member_address_town">Town</label>
        <p>City or town of residence.</p>
        <input type="text" name="town" id="new_member_address_town" />
      </div>
      <div class="field">
        <label for="new_member_address_province">Province</label>
        <p>Enter the province.</p>
        <input type="text" name="province" id="new_member_address_province" />
      </div>
    </div>

    <div class="field">
      <label for="new_member_role">Role</label>
      <p>Select the staff member’s role and system access level.</p>
      <select type="text" name="role" id="new_member_role">
        <option value="pharmacist" name="pharmacist">pharmacist</option>
        <option value="cashier" name="cashier">Cashier</option>
      </select>
    </div>

    <button class="save">Create</button>
  </form>
`;

function handleFormSubmit() {
  const staffCreationForm = document.getElementById(
    "create_new_pharmacy_staff_member",
  );

  staffCreationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(staffCreationForm);
    const data = await createStaff(formData);

    const firstName = formData.get("firstName")?.trim();
    const lastName = formData.get("lastName")?.trim();
    const contactNo = formData.get("contactNo")?.trim();
    const email = formData.get("email")?.trim();
    const addressNo = formData.get("addressNo")?.trim();
    const street = formData.get("street")?.trim();
    const town = formData.get("town")?.trim();
    const province = formData.get("province")?.trim();
    const role = formData.get("role")?.trim();

    // 🔴 Validation checks
    if (!firstName || !lastName) {
      return swal({
        title: "Validation Error",
        text: "First name and last name are required",
        icon: "warning",
      });
    }

    // Sri Lanka phone (simple check: 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactNo)) {
      return swal({
        title: "Invalid Phone Number",
        text: "Enter a valid 10-digit contact number",
        icon: "warning",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return swal({
        title: "Invalid Email",
        text: "Enter a valid email address",
        icon: "warning",
      });
    }

    if (!addressNo || !street || !town || !province) {
      return swal({
        title: "Validation Error",
        text: "All address fields are required",
        icon: "warning",
      });
    }

    if (!role) {
      return swal({
        title: "Validation Error",
        text: "Please select a role",
        icon: "warning",
      });
    }

    if (data.status == "success") {
      swal({
        title: "Staff member Created",
        icon: "success",
      }).then(() => {
        closeSidebar();
      });
    } else {
      swal({
        title: "Member Creation Failed",
        icon: "error",
        text: data.message,
      });
    }
  });
}

export async function handleCreateStaff() {
  const createStaffButton = document.getElementById("add-new-staff");
  createStaffButton.addEventListener("click", async () => {
    setSidebarContent(sideBarTemplate);
    openSidebar();
    handleFormSubmit();
  });
}
