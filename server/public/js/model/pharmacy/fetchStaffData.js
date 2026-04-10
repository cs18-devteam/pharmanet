import Application from "../application/Application.js";

export async function createStaff(formData) {
    try{
        const response = await fetch(`/pharmacies/${Application.pharmacyId}/staff/create` , {
            method: "POST",
            body : formData,
        });

        const data = await response.json();
        return data;

    }catch(e){
        return {
            status:"error",
            results: [],
            message: e.message,
        }
    }
}   


export async function getStaffData() {
    try{
        const response = await fetch(`/pharmacies/${Application.pharmacyId}/staff` , {
            method: "GET",
        });

        const data = await response.json();
        return data;
        

    }catch(e){
        console.log(e);
        return {
            status:"error",
            results:[],
            message: e.message,
        }
    }
}


export async function updateStaffPermissions(formData) {
    try{

        const response = await fetch(`/pharmacies/${Application.pharmacyId}/staff/${Application.staffId}/permissions` , {
            method: "POST",
            body: formData,
        });

        if(response.status == 401){
            throw new Error("unauthorized access");
        }

        const data = await response.json();
        return data;
        

    }catch(e){
        console.log(e);
        return {
            status:"error",
            results:[],
            message: e.message,
        }
    }
}

export async function resetPassword(staffId) {
    try{
        const res = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/staff/${staffId}/reset` , {
            method:"PATCH"
        });

        const data = await res.json();
        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            error:e.message,
        }
    }
}

export async function deleteStaffMemberAccount(staffId) {
    try{
        const res = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/staff/${staffId}/delete` , {
            method:"DELETE"
        });

        const data = await res.json();
        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            error:e.message,
        }
    }
}