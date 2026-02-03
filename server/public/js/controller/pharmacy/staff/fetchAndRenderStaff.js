import { getStaffData } from "../../../model/pharmacy/fetchStaffData.js";
import { getLeaveRequests } from "../../../model/pharmacy/fetchLeaveData.js";
import html from "../../../view/html.js";

const template = html`
  <div class="staff-item" data-id="{userId}" data-staffId="{staffId}">
    <img src="{profile}" alt="avatar" />
    <div class="info">
      <h4>{firstName} {lastName}</h4>
      <span>{role}</span>
    </div>
  </div>
`;

const leaveCardTemplate = html`
  <div class="leave-card">
    <div class="card-content">
      <h4>{leaveType}</h4>
      <p class="date">{startDate} - {endDate} ({leaveCategory})</p>
      <p class="desc">{reason}</p>
    </div>
    <span class="status {statusClass}">{status}</span>
  </div>
`;

let selectedStaffId = null;
let allStaffMembers = [];

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

function formatLeaveType(type) {
  const typeMap = {
    annualLeave: "Annual Leave",
    casualLeave: "Half Day",
    sickLeave: "Full Day",
  };
  return typeMap[type] || type;
}

function formatLeaveCategory(category) {
  const categoryMap = {
    annualLeave: "Short Leave",
    casualLeave: "Half Day",
    sickLeave: "Full Day",
  };
  return categoryMap[category] || category;
}

export async function fetchAndRenderLeaves() {
  try {
    const { results } = await getLeaveRequests();

    if (!results || results.length === 0) {
      document.querySelector(".recentLeaveContainer").innerHTML = `
                <h3 class="section-title">Recent Application:</h3>
                <p style="text-align: center; color: #666; padding: 20px;">No leave requests found</p>
            `;
      return;
    }

    // Separate pending and past leaves
    const pendingLeaves = results.filter((leave) => leave.status === "pending");
    const pastLeaves = results.filter((leave) => leave.status !== "pending");

    let recentHTML = '<h3 class="section-title">Recent Application:</h3>';

    if (pendingLeaves.length === 0) {
      recentHTML +=
        '<p style="color: #666; padding: 10px 0;">No pending applications</p>';
    } else {
      pendingLeaves.forEach((leave) => {
        recentHTML += leaveCardTemplate
          .replace("{leaveType}", formatLeaveType(leave.leaveType))
          .replace("{startDate}", formatDate(leave.startDate))
          .replace("{endDate}", formatDate(leave.endDate))
          .replace("{leaveCategory}", formatLeaveCategory(leave.leaveCategory))
          .replace("{reason}", leave.reason || "No reason provided")
          .replace("{statusClass}", leave.status.toLowerCase())
          .replace(
            "{status}",
            leave.status.charAt(0).toUpperCase() + leave.status.slice(1),
          );
      });
    }

    let pastHTML = '<h3 class="section-title">Past Application:</h3>';

    if (pastLeaves.length === 0) {
      pastHTML +=
        '<p style="color: #666; padding: 10px 0;">No past applications</p>';
    } else {
      pastLeaves.forEach((leave) => {
        pastHTML += leaveCardTemplate
          .replace("{leaveType}", formatLeaveType(leave.leaveType))
          .replace("{startDate}", formatDate(leave.startDate))
          .replace("{endDate}", formatDate(leave.endDate))
          .replace("{leaveCategory}", formatLeaveCategory(leave.leaveCategory))
          .replace("{reason}", leave.reason || "No reason provided")
          .replace("{statusClass}", leave.status.toLowerCase())
          .replace(
            "{status}",
            leave.status.charAt(0).toUpperCase() + leave.status.slice(1),
          );
      });
    }

    const leaveContainer = document.querySelector(".recentLeaveContainer");
    leaveContainer.innerHTML = recentHTML + pastHTML;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    document.querySelector(".recentLeaveContainer").innerHTML = `
            <h3 class="section-title">Recent Application:</h3>
            <p style="text-align: center; color: #f44336; padding: 20px;">Error loading leave requests</p>
        `;
  }
}

export async function fetchAndRenderStaff() {
  try {
    console.log("Fetching staff data...");
    const response = await getStaffData();
    console.log("Staff response:", response);
    
    const { results } = response;

    if (!results || results.length === 0) {
      console.log("No staff members found");
      document.querySelector(".staff-list").innerHTML = `
        <p style="text-align: center; color: #666; padding: 20px;">No staff members found</p>
      `;
      return;
    }

    allStaffMembers = results;
    console.log("Found", results.length, "staff members");

    const allStaffCards = results
      .map((member) =>
        template
          .replace("{userId}", member.userId || "")
          .replace("{staffId}", member.staffId || member.id || "")
          .replace("{profile}", member.profile || "/users/profile-general.jpg")
          .replace("{role}", member.role || "Staff")
          .replace("{firstName}", member.firstName || "Unknown")
          .replace("{lastName}", member.lastName || ""),
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
        
        // Get the userId from data attribute
        const userId = this.getAttribute("data-id");
        const staffId = this.getAttribute("data-staffId");
        
        selectedStaffId = staffId;
        console.log("Selected staff:", { userId, staffId });

        // Hide recent leaves and show actions
        const recentLeaveContainer = document.querySelector(".recentLeaveContainer");
        const actions = document.querySelector(".actions");

        if (recentLeaveContainer) {
          recentLeaveContainer.style.display = "none";
        }
        if (actions) {
          actions.style.display = "block";
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
          selectedStaffId = null;
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