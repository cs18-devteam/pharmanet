import html from "../../view/html.js";
import Application from "../../model/application/Application.js";
import { swal } from "../../view/swal.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { updateUserProfilePhoto } from "../../model/updateUserProfilePhoto.js";

const deleteButton = document.getElementById("delete-account__button");
const addAddressButton = document.querySelector(".address_add_button");
const updateButton = document.getElementById("update-btn");
const buttonContainer = document.querySelector(".update_action_fields");
const mainContainer = document.querySelector('.mainContainer');

const saveButtons = `         
        <button class="cancel">cancel</button>
        <button class="save">save</button>`
    ;


deleteButton?.addEventListener("click", (e) => {
    swal({
        title: "Do you want to delete account ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "delete",
    }).then(async v => {
        if (v.isConfirmed) {
            const res = await fetch(`/api/v1/users/${Application.userId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                swal({
                    title: "Account not Deleted!",
                    icon: "error",
                })
            } else {
                swal({
                    title: "account deleted Successfully",
                    icon: "success"
                }).then(() => {
                    window.location.href = "/";
                })
            }
        }
    })
})


addAddressButton?.addEventListener("click", e => {
    const div = document.createElement('div');
    div.insertAdjacentHTML("beforeend", html`
        <input type="text" placeholder="no"  class="update-field update-field_no edit"><Br>
        <input type="text" placeholder="street"   class="update-field update-field_street edit"><br>
        <input type="text" placeholder="town"  class="update-field update-field_town edit"><br>
        <input type="text" placeholder="province" class="update-field update-field_province edit"><br>
    `);
    addAddressButton.replaceWith(div);
    buttonContainer.innerHTML = saveButtons;

})


updateButton?.addEventListener("click", e => {
    const inputFields = document.querySelectorAll(".update-field");
    Array.from(inputFields).forEach(el => {
        if (el.classList.contains("update-field__email")) return;
        if (el.classList.contains("update-field__nic")) return;

        el.removeAttribute('disabled');
        el.classList.add('edit');
    });

    buttonContainer.innerHTML = saveButtons;

})


mainContainer.addEventListener("click", async (e) => {
    const target = e.target;

    if (target.classList.contains("cancel")) {
        const editFields = document.querySelectorAll(".edit");
        editFields?.forEach(el => el.classList.remove('edit'));
        buttonContainer.innerHTML = '';
    }


    if (target.classList.contains("save")) {
        const firstName = document.querySelector(".update-field__firstName.edit");
        const lastName = document.querySelector(".update-field__lastName.edit");
        const addressNo = document.querySelector(".update-field_no.edit");
        const street = document.querySelector(".update-field_street.edit");
        const town = document.querySelector(".update-field_town.edit");
        const province = document.querySelector(".update-field_province.edit");

        const updateObj = {};
        if (firstName && firstName.value != "") updateObj.firstName = firstName.value;
        if (lastName && lastName.value != "") updateObj.lastName = lastName.value;
        if (addressNo && addressNo.value != "") updateObj.addressNo = addressNo.value;
        if (street && street.value != "") updateObj.street = street.value;
        if (town && town.value != "") updateObj.town = town.value;
        if (province && province.value != "") updateObj.province = province.value;

        let length = 0;
        for (const [key, value] of Object.entries(updateObj)) {
            length += 1;
        }

        if (length == 0) {
            swal({
                title: "missing form data",
                icon: "error",
            })
            return;
        }

        renderSpinner();

        const res = await fetch(`/api/v1/users/${Application.userId}`, {
            method: "PATCH",
            body: JSON.stringify(updateObj)
        });

        removeSpinner();

        if (!res.ok) swal({
            title: "something went wrong",
            icon: "error",
        })
        const data = await res.json();
        if (data.status == "success") {
            swal({
                title: "account updated successfully",
                icon: "success",
            })
            const editFields = document.querySelectorAll("input.edit");
            editFields?.forEach(el => {
                el.classList.remove('edit');
                el.setAttribute("disabled", true);
            })
            buttonContainer.innerHTML = "";
        } else {
            swal({
                title: "account not updated",
                text: data.error,
                icon: "error",
            })
        }

    }
})



const profileImage = document.querySelector(".profile-card");

profileImage?.addEventListener('click', e => {
    const inputEl = document.createElement("input");
    inputEl.setAttribute('type', "file");
    inputEl.setAttribute('accept', "image/*");
    inputEl.setAttribute('hidden', "true");
    document.body.append(inputEl);



    inputEl.addEventListener("change", async e => {
        try {

            const file = e.target.files[0];
            if (!file) return swal({
                title: "file not selected",
                icon: "warning",
            });

            const results= await updateUserProfilePhoto(file);
            
            if (results.status == "error") throw new Error("file not uploaded")

                console.log(results);

            if(results.status == "success"){
                const img = profileImage.querySelector("img")
                if(img) img.src = results.profile;
            }

        } catch (e) {
            console.log(e); swal({
                title: "Something went wrong",
                icon: "error",
            });
        }
    })



    swal({
        title: 'Do you want to update your photo ? ',
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
    }).then(v => {
        if (v.isConfirmed) {
            inputEl.click();
        }
    })




})

