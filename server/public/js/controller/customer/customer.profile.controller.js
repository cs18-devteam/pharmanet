document.addEventListener("DOMContentLoaded", () => {


    const updateBtn = document.querySelector(".profile-card button");
    const saveBtn = document.querySelector(".form-area button");
    const inputs = document.querySelectorAll(".form-area input");
    const deleteBtn = document.querySelector(".delete");

    //Get Customer Id 
    const customerId = window.location.pathname.split("/")[2];

    //first enable edit mode
    if (updateBtn){
        updateBtn.addEventListener("click", () => {
            inputs.forEach(function (input){
                if (input.name !== "email"){
                    input.disabled = false;
                }
            });
                saveBtn.style.display = "inline-block";
                updateBtn.style.display = "none";

        })
    }

    //save profile changes
    if (saveBtn){
        saveBtn.addEventListener("click", async function(){
            const updatedData = {};
            inputs.forEach(function (input){
                if(!input.disabled){
                    if(input.name === "fullAddress"){
                        const addressPart = input.value.split(",");
                        
                        updatedData.addressNo = addressPart[0]?.trim()||"";
                        updatedData.street = addressPart[1]?.trim()||"";
                        updatedData.town = addressPart[2]?.trim()||"";
                        updatedData.province = addressPart[3]?.trim()||"";
                    } else {
                    updatedData[input.name] = input.value;

                }
            }
        });
        

            try{
                const response = await fetch(`/api/v1/users/${customerId}`, {
                    method: 'PATCH',
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
                });

                const result = await response.json();

                if (result.success){
                    alert("Profile updated successfully");
                    window.location.reload();
                } else {
                    alert("Failed to update profile: " + result.message);
                }
                
            }catch(e){
                console.error(e);
                alert("An error occurred while updating profile");
            }
        });
}


//Delete account

if (deleteBtn){
    deleteBtn.addEventListener("click", async function(e){
        e.preventDefault();

        const confirmDelete = confirm("Are you sure you want to delete your account?");
        if (!confirmDelete)return;

        try{
            const response = await fetch(`/api/v1/users/${customerId}`,{
                method: 'DELETE'
            });

            const result = await response.json();
            
            if (result.success){
                alert("Account deleted successfully");
                window.location.href = "/"; // Redirect to homepage after deletion
            }else{
                alert( "Failed to delet4e account: " + result.message);
            }
        }catch(e){
            console.error(e);
            alert("An error occurred while deleting account");
        }
    });
}

});