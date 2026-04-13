import Application from "./application/Application.js";

export async function updateUserProfilePhoto(image) {
    try{

        const form = new FormData();
        form.append('profile', image);
        
        
        
        const response = await fetch(`/api/v1/users/${Application.userId}/upload/profile`, {
            method: "POST",
            body: form,
        })
        const results = await response.json();

        return results;
    }catch(e){
        console.log(e);
        return {
            status:"error",
            message: e.message || "something went wrong",
        }
    }

}