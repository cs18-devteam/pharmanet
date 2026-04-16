import { getStaffData } from "../../../model/pharmacy/fetchStaffData.js";
import { getLeaveRequests } from "../../../model/pharmacy/fetchLeaveData.js";
import { setSelectedStaffData } from "./handleEditStaff.js";
import html from "../../../view/html.js";
import Application from "../../../model/application/Application.js";

const template = html`
  <div class="staff-item" data-id="{userId}" data-staffId="{staffId}">
    <img src="{profile}" alt="avatar" />
    <div class="info">
      <h4>{you} {firstName} {lastName}</h4>
      <span>ID:{id} - </span><span>{role}</span>

    </div>
  </div>
`;


export async function fetchAndRenderStaff() {
  try {
    console.log("Fetching staff data...");
    const response = await getStaffData();
    console.log("Staff response:", response);

    
    const { results } = response;
    Application.staffData = results;

    if (!results || results.length === 0) {
      console.log("No staff members found");
      document.querySelector(".staff-list").innerHTML = `
        <p style="text-align: center; color: #666; padding: 20px;">No staff members found</p>
      `;
      return;
    }

    Application.allStaffMembers = results; // Store for later use
    console.log("Found", results.length, "staff members");

    console.log(Application.staffData);

    const allStaffCards = results
      .map((member) =>
        template
          .replace("{you}" , member.staffId == Application.staffId ? "(You)" : "")
          .replace("{userId}", member.userId || "")
          .replace("{staffId}", member.staffId || member.id || "")
          .replace("{profile}", member.profile || "/users/profile-general.jpg")
          .replace("{role}", member.role || "Staff")
          .replace("{firstName}", member.firstName || "Unknown")
          .replace("{lastName}", member.lastName || "")
          .replace("{id}", member.staffId || ""),
      )
      .join(" ");

    const staffCardList = document.querySelector(".staff-list");
    if (staffCardList) {
      staffCardList.innerHTML = allStaffCards;
      console.log("Staff list updated successfully");
    } else {
      console.error("Staff list container not found!");
      return;
    }

    // Add click handlers to all staff items
    document.querySelectorAll(".staff-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();


        
        // Get the userId and staffId from data attributes
        const userId = this.getAttribute("data-id");
        const staffId = this.getAttribute("data-staffId");
        
        // Find the full staff member data
        const selectedStaff = Application.allStaffMembers.find(m => 
          m.userId == userId && m.staffId == staffId
        );

        if (selectedStaff) {
          Application.currentSelectedStaffMember = Application.allStaffMembers.find(m=>{
            return m.staffId == selectedStaff.staffId
          });

        
          // Pass the selected staff data to the edit form
          setSelectedStaffData(Application.currentSelectedStaffMember);
          
          // Hide recent leaves and show actions
          const recentLeaveContainer = document.querySelector(".recentLeaveContainer");
          const actions = document.querySelector(".actions");
          const memberName = actions.querySelector('.staff-member-name');

          if (recentLeaveContainer) {
            recentLeaveContainer.style.display = "none";
          }
          if (actions) {
            actions.style.display = "block";
             if(memberName) memberName.textContent = `${Application.currentSelectedStaffMember.firstName || " "} ${Application.currentSelectedStaffMember.lastName || " "}`
          }
        } else {
          console.error("Staff member data not found");
        }
      });
    });

    // Click outside handler to go back to leave view
    document.addEventListener("click", function (event) {
      const staffList = document.querySelector(".staff-list");
      const actions = document.querySelector(".actions");
      const recentLeave = document.querySelector(".recentLeaveContainer");

      // Check if click is outside both staff-list and actions
      if (staffList && actions && recentLeave) {
        const clickedInsideStaffList = staffList.contains(event.target);
        const clickedInsideActions = actions.contains(event.target);

        if (!clickedInsideStaffList && !clickedInsideActions) {
          recentLeave.style.display = "block";
          actions.style.display = "none";
        }
      }
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    const staffCardList = document.querySelector(".staff-list");
    if (staffCardList) {
      staffCardList.innerHTML = `
        <p style="text-align: center; color: #f44336; padding: 20px;">Error loading staff: ${error.message}</p>
      `;
    }
  }
}