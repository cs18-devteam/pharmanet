import { swal } from "../../../view/swal.js";
import Application from "../../../model/application/Application.js";

let selectedStaffData = null;
let isEditInitialized = false;


export function setSelectedStaffData(staffData) {
    // Add pharmacyId from Application if not present
    selectedStaffData = {
        ...staffData,
        pharmacyId: staffData.pharmacyId || Application.pharmacyId
    };
    console.log("Selected staff data set:", selectedStaffData);
    populateEditForm(selectedStaffData);
}

function populateEditForm(staffData) {
    const editForm = document.querySelector('#editAccount form');
    if (!editForm) return;

    console.log(staffData);
    // Populate form fields with staff data
    editForm.querySelector('input[name="firstName"]').value = staffData.firstName || '';
    editForm.querySelector('input[name="lastName"]').value = staffData.lastName || '';
    editForm.querySelector('input[name="contact"]').value = staffData.contact || '';
    editForm.querySelector('input[name="email"]').value = staffData.email || '';
    editForm.querySelector('input[name="nic"]').value = staffData.nic || '';
    editForm.querySelector('input[name="role"]').value = staffData.role || '';

    // Update UID display
    const uidElement = document.querySelector('#editAccount .uid');
    if (uidElement) {
        uidElement.textContent = `UID: ${staffData.userId || staffData.id || 'N/A'}`;
    }
}

async function updateStaffMember(formData) {
    try {
        // Validate we have required data
        if (!selectedStaffData) {
            throw new Error("No staff data selected");
        }
        if (!selectedStaffData.pharmacyId) {
            throw new Error("Pharmacy ID is missing");
        }
        if (!selectedStaffData.staffId && !selectedStaffData.id) {
            throw new Error("Staff ID is missing");
        }

        const staffId = selectedStaffData.staffId || selectedStaffData.id;
        const url = `/api/v1/pharmacies/${selectedStaffData.pharmacyId}/staff/${staffId}/update`;
        
        console.log("Sending update request to:", url);
        console.log("Selected staff data:", selectedStaffData);
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
        return data;
    } catch (e) {
        console.error('Error updating staff:', e);
        return {
            status: 'error',
            message: e.message,
        };
    }
}

function handleEditFormSubmit() {
    const editForm = document.querySelector('#editAccount form');
    
    if (!editForm) {
        console.error("Edit form not found in DOM");
        return;
    }
    
    const submitButton = editForm.querySelector('.save-btn');
    
    if (!submitButton) {
        console.error("Submit button not found");
        return;
    }

    // Remove old listener to prevent duplicates
    const newSubmitButton = submitButton.cloneNode(true);
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);

    newSubmitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (!selectedStaffData) {
            swal({
                title: "Error",
                icon: "error",
                text: "No staff member selected for editing.",
            });
            return;
        }

        // Disable button to prevent double-clicks
        newSubmitButton.disabled = true;

        console.log("Edit form submission started...");
        console.log("Selected staff data:", selectedStaffData);

        // Get form data
        const firstName = editForm.querySelector('input[name="firstName"]').value;
        const lastName = editForm.querySelector('input[name="lastName"]').value;
        const contact = editForm.querySelector('input[name="contact"]').value;
        const email = editForm.querySelector('input[name="email"]').value;
        const nic = editForm.querySelector('input[name="nic"]').value;
        const role = editForm.querySelector('input[name="role"]').value;

        console.log("Form data:", { firstName, lastName, role, contact, email, nic });

        // Validate required fields
        if (!firstName || !lastName) {
            newSubmitButton.disabled = false;
            swal({
                title: "Validation Error",
                icon: "warning",
                text: "First name and last name are required.",
            });
            return;
        }

        // Create FormData
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('nic', nic);
        formData.append('role', role);

        try {
            console.log("Sending update request...");
            const data = await updateStaffMember(formData);
            console.log("Response received:", data);

            if (data.status === "success") {
                // Close the modal
                const editModal = editForm.closest('#editAccount');
                if (editModal) {
                    editModal.classList.remove("active");
                    editModal.style.display = "none";
                }
                
                // Clear the form
                editForm.reset();

                // Show success message
                await swal({
                    title: "Staff Updated",
                    icon: "success",
                    text: "Staff member details have been updated successfully."
                });

                // Reload the page to refresh all data
                window.location.reload();
            } else {
                console.error("Update failed:", data);
                newSubmitButton.disabled = false;
                swal({
                    title: "Update Failed",
                    icon: "error",
                    text: data.message || "Failed to update staff member. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error updating staff:", error);
            newSubmitButton.disabled = false;
            swal({
                title: "Error",
                icon: "error",
                text: error.message || "An error occurred while updating staff member.",
            });
        }
    });
}

export function initializeEditStaffForm() {
    if (isEditInitialized) {
        console.log("Edit staff form already initialized, skipping...");
        return;
    }

    let attempts = 0;
    const maxAttempts = 50;
    
    const checkAndInitialize = setInterval(() => {
        attempts++;
        
        if (typeof document === 'undefined') {
            console.error("document is not available");
            clearInterval(checkAndInitialize);
            return;
        }
        
        const form = document.querySelector('#editAccount form');
        
        if (form) {
            console.log("Edit form found, initializing...");
            clearInterval(checkAndInitialize);
            isEditInitialized = true;
            handleEditFormSubmit();
        } else if (attempts >= maxAttempts) {
            console.error("Edit form not found after", maxAttempts * 100, "ms");
            clearInterval(checkAndInitialize);
        }
    }, 100);
}