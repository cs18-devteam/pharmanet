import Application from "../../../model/application/Application.js";
import { createLeaveRequest } from "../../../model/pharmacy/fetchLeaveData.js";
import { swal } from "../../../view/swal.js";

// Flag to prevent multiple initializations
let isInitialized = false;

function handleLeaveFormSubmit() {
    const leaveForm = document.querySelector('#createLeave form');
    
    if (!leaveForm) {
        console.error("Leave form not found in DOM");
        return;
    }
    
    const submitButton = leaveForm.querySelector('.apply-btn');
    
    if (!submitButton) {
        console.error("Submit button not found");
        return;
    }

    // Remove old listener to prevent duplicates
    const newSubmitButton = submitButton.cloneNode(true);
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);

    newSubmitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Disable button to prevent double-clicks
        newSubmitButton.disabled = true;

        console.log("Form submission started...");

        // Validate form data first
        const leaveType = leaveForm.querySelector('select[id="leaveType"]').value;
        const startDate = leaveForm.querySelector('input[name="startDate"]').value;
        const endDate = leaveForm.querySelector('input[name="endDate"]').value;
        const leaveCategory = leaveForm.querySelector('select[name="leaveCategory"]').value;
        const reason = leaveForm.querySelector('textarea[name="reason"]').value;
        const documentInput = leaveForm.querySelector('input[type="file"]');
        const document = documentInput ? documentInput.files[0] : null;
        const coveredBy = leaveForm.querySelector('input[name="coveredBy"]').value;

        // Validate required fields
        if (!leaveType || leaveType === "") {
            newSubmitButton.disabled = false;
            swal({
                title: "Validation Error",
                icon: "warning",
                text: "Please select a leave type.",
            });
            return;
        }

        if (!startDate || !endDate) {
            newSubmitButton.disabled = false;
            swal({
                title: "Validation Error",
                icon: "warning",
                text: "Please select start and end dates.",
            });
            return;
        }

        if (!leaveCategory || leaveCategory === "") {
            newSubmitButton.disabled = false;
            swal({
                title: "Validation Error",
                icon: "warning",
                text: "Please select a leave category.",
            });
            return;
        }

        // Create FormData with proper field names
        const leaveData = new FormData();
        leaveData.append('staffId' , Application.currentSelectedStaffMember.staffId);
        leaveData.append('leaveType', leaveType);
        leaveData.append('startDate', startDate);
        leaveData.append('endDate', endDate);
        leaveData.append('leaveCategory', leaveCategory);
        leaveData.append('reason', reason || '');
        leaveData.append('coveredBy', coveredBy || '');
        
        if (document) {
            leaveData.append('document', document);
        }

        try {
            console.log("Sending request...");
            const data = await createLeaveRequest(leaveData);
            console.log("Response received:", data);

            if (data.status === "success") {
                // Close and hide the modal using the same reference we already have
                const createLeaveModal = leaveForm.closest('#createLeave');
                if (createLeaveModal) {
                    createLeaveModal.classList.remove("active");
                    createLeaveModal.style.display = "none";
                }
                
                // Clear the form
                leaveForm.reset();

                // Show success message
                await swal({
                    title: "Leave Request Submitted",
                    icon: "success",
                    text: "Your leave request has been submitted for approval."
                });

                // Reload the page to refresh all data
                if (typeof window !== 'undefined' && window.location) {
                    window.location.reload();
                }
            } else {
                console.error("Submission failed:", data);
                newSubmitButton.disabled = false;
                swal({
                    title: "Submission Failed",
                    icon: "error",
                    text: data.message || "Failed to submit leave request. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error submitting leave:", error);
            newSubmitButton.disabled = false;
            swal({
                title: "Error",
                icon: "error",
                text: error.message || "An error occurred while submitting your leave request.",
            });
        }
    });
}

export function initializeLeaveForm() {
    // Prevent multiple initializations
    if (isInitialized) {
        console.log("Leave form already initialized, skipping...");
        return;
    }
    
    // Wait for the form to be available in DOM with multiple checks
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const checkAndInitialize = setInterval(() => {
        attempts++;
        
        if (typeof document === 'undefined') {
            console.error("document is not available");
            clearInterval(checkAndInitialize);
            return;
        }
        
        const form = document.querySelector('#createLeave form');
        
        if (form) {
            console.log("Leave form found, initializing...");
            clearInterval(checkAndInitialize);
            isInitialized = true; // Mark as initialized
            handleLeaveFormSubmit();
        } else if (attempts >= maxAttempts) {
            console.error("Leave form not found after", maxAttempts * 100, "ms");
            clearInterval(checkAndInitialize);
        }
    }, 100);
}