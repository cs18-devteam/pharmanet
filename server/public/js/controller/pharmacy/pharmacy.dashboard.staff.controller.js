import { fetchAndRenderStaff } from "./staff/fetchAndRenderStaff.js";
import { fetchAndRenderLeaves } from "./staff/fetchAndRenderLeaves.js";
import { handleCreateStaff } from "./staff/handleCreateStaff.js";
import { handleEditPermission } from "./staff/handleEditPermission.js";
import { initializeLeaveForm } from "./staff/handleCreateLeave.js";
import Application from "../../model/application/Application.js";


export default function init(){
    handleCreateStaff();   
    handleEditPermission(); 
    initializeLeaveForm();

// Wait for Application data to be loaded
    const waitForApplicationData = setInterval(() => {
        if (Application.pharmacyId && Application.staffId) {
            clearInterval(waitForApplicationData);
            console.log("Fetching data with:", Application.pharmacyId, Application.staffId);
            
            // Fetch staff list
            fetchAndRenderStaff();
            
            // Fetch and render leaves from database
            fetchAndRenderLeaves();
        }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => {
        clearInterval(waitForApplicationData);
        if (!Application.pharmacyId || !Application.staffId) {
            console.error("Application data not loaded after 5 seconds");
            console.log("pharmacyId:", Application.pharmacyId, "staffId:", Application.staffId);
        }
    }, 5000);

}