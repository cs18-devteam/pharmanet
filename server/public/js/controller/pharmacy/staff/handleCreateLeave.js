import { createLeaveRequest } from "../../../model/pharmacy/fetchLeaveData.js";
import { swal } from "../../../view/swal.js";

function handleLeaveFormSubmit() {
    const leaveForm = document.querySelector('#createLeave form');
    const submitButton = leaveForm.querySelector('.apply-btn');

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const formData = new FormData(leaveForm);
        
        // Add names to form inputs in the HTML first
        const leaveType = leaveForm.querySelector('select[id="leaveType"]').value;
        const startDate = leaveForm.querySelector('input[type="date"]:nth-of-type(1)').value;
        const endDate = leaveForm.querySelector('input[type="date"]:nth-of-type(2)').value;
        const leaveCategory = leaveForm.querySelectorAll('select')[1].value;
        const reason = leaveForm.querySelector('textarea').value;
        const document = leaveForm.querySelector('input[type="file"]').files[0];
        const coveredBy = leaveForm.querySelector('input[type="email"]').value;

        // Create FormData with proper field names
        const leaveData = new FormData();
        leaveData.append('leaveType', leaveType);
        leaveData.append('startDate', startDate);
        leaveData.append('endDate', endDate);
        leaveData.append('leaveCategory', leaveCategory);
        leaveData.append('reason', reason);
        leaveData.append('coveredBy', coveredBy);
        
        if (document) {
            leaveData.append('document', document);
        }

        const data = await createLeaveRequest(leaveData);

        if (data.status === "success") {
            swal({
                title: "Leave Request Submitted",
                icon: "success",
                text: "Your leave request has been submitted for approval."
            }).then(() => {
                closeWindow('createLeave');
                leaveForm.reset();
            });
        } else {
            swal({
                title: "Submission Failed",
                icon: "error",
                text: data.message || "Failed to submit leave request. Please try again.",
            });
        }
    });
}

export function initializeLeaveForm() {
    // Wait for the form to be available in DOM
    setTimeout(() => {
        handleLeaveFormSubmit();
    }, 100);
}