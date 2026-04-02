import Application from "../../../model/application/Application.js";
import { deleteStaffMemberAccount, resetPassword } from "../../../model/pharmacy/fetchStaffData.js";
import { swal } from "../../../view/swal.js";
import { fetchAndRenderLeaves } from "./fetchAndRenderLeaves.js";
import { fetchAndRenderStaff } from "./fetchAndRenderStaff.js";


let eventListener = undefined;


export async function handleResetPasswordAndDeleteAcc() {
    try {
        const panel = document.querySelector('.side-panel#editAccount');

        console.log(panel);
        if (!eventListener) removeEventListener("click", eventListener);

        eventListener = panel?.addEventListener("click", e => {
            console.log(e);
            const target = e.target;
            if (target.classList.contains("reset")) {



                swal({
                    title: "Do you want to reset password",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "reset"

                }).then(async v => {
                    if (v.isConfirmed) {
                        const results = await resetPassword(Application.currentSelectedStaffMember.id);




                        if (results.status == "success") {
                            swal({
                                title: "password reset successful",
                                icon: "success",
                            })

                            fetchAndRenderStaff();

                            // Fetch and render leaves from database
                            fetchAndRenderLeaves();
                        } else {
                            swal({
                                title: "password reset failed",
                                icon: "error",
                            })

                        }
                    }
                })
            }

            if (target.classList.contains("delete")) {
                if (Application.currentSelectedStaffMember.id == Application.staffId) {
                    swal({
                        title: "You cannot delete your self",
                        icon: "warning",
                    })
                    return;
                }


                swal({
                    title: "Do you want to delete staff member",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "delete"
                }).then(async v => {
                    if (v.isConfirmed) {
                        const results = await deleteStaffMemberAccount(Application.currentSelectedStaffMember.id);

                        if (results.status == "success") {
                            swal({
                                title: "staff member deleted successful",
                                icon: "success",
                            })
                        } else {
                            swal({
                                title: "staff member deleted failed",
                                icon: "error",
                            })

                        }

                    }
                })
            }
        })




    } catch (e) {
        console.log(e);
        swal({
            title: "reset password failed",
        })
    }
}


