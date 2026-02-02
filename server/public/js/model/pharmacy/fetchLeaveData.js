import Application from "../application/Application.js";

export async function createLeaveRequest(formData) {
    try {
        const response = await fetch(
            `/api/v1/pharmacies/${Application.pharmacyId}/staff/${Application.staffId}/leaves`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        return data;

    } catch (e) {
        return {
            status: "error",
            results: [],
            message: e.message,
        }
    }
}

export async function getLeaveRequests() {
    try {
        const response = await fetch(
            `/api/v1/pharmacies/${Application.pharmacyId}/staff/${Application.staffId}/leaves`,
            {
                method: "GET",
            }
        );

        const data = await response.json();
        return data;

    } catch (e) {
        console.log(e);
        return {
            status: "error",
            results: [],
            message: e.message,
        }
    }
}