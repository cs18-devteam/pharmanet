import Application from "../../../model/application/Application.js";
import { renderWaitingList } from "../../../view/pharmacy/chat/renderWaitingList.js";
import { swal } from "../../../view/swal.js";

export function disconnect() {
    try {
        let attempt = 0;
        const id = Application.remoteOrderId;
        const disconnectNotice = document.querySelector(".chats .disconnect-notice");
        if (!disconnectNotice) throw new Error("disconnect notice not found");
        const confirmBtn = disconnectNotice.querySelector('.save-order');
        confirmBtn?.addEventListener("click", () => {
            swal({
                title: "order saved",
                icon: "success",
            })
            renderWaitingList();
        })

        const deleteButton = disconnectNotice.querySelector('.delete-order');
        deleteButton?.addEventListener("click", () => {
            swal({
                title: "do you want to delete order ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Delete & Exit",
            }).then(async v => {
                if (v.isConfirmed) {
                    const data = await deleteOrder(id);

                    if (data.status == "success") {
                        swal({
                            title: "Order deleted successful",
                            icon: "success",
                        }).then(() => {
                            renderWaitingList();
                        })
                    } else {
                        attempt++;
                        swal({
                            title: "order not deleted",
                            icon: "error",
                        })

                        if (3 < attempt) {
                            renderWaitingList();
                        }
                    }
                }
            })
        })



    } catch (e) {
        console.log(e);
    }
}


