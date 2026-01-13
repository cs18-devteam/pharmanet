import { fetchAndRenderStaff } from "./staff/fetchAndRenderStaff.js";
import { handleCreateStaff } from "./staff/handleCreateStaff.js";
import { handleEditPermission } from "./staff/handleEditPermission.js";


export default function init(){
    handleCreateStaff();   
    handleEditPermission(); 
    fetchAndRenderStaff();



}