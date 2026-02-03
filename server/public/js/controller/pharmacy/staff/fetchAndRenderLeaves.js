// File: server/public/js/controller/pharmacy/staff/fetchAndRenderLeaves.js
import { getLeaveRequests } from "../../../model/pharmacy/fetchLeaveData.js";
import html from "../../../view/html.js";

const leaveCardTemplate = html`
    <div class="leave-card">
        <div class="card-content">
            <h4>{leaveType}</h4>
            <p class="applier"><strong>{firstName} {lastName}</strong> ({role})</p>
            <p class="date">{startDate} – {endDate} </p>
            <p class="desc">{reason}</p>
        </div>
        <span class="status {statusClass}">{leaveCategory}</span>
    </div>
`;

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

function formatLeaveType(type) {
    const typeMap = {
        'annualLeave': 'Annual Leave',
        'casualLeave': 'Casual Leave',
        'sickLeave': 'Sick Leave',
        'maternityLeave': 'Maternity Leave'
    };
    return typeMap[type] || type;
}

function formatLeaveCategory(category) {
    const categoryMap = {
        'annualLeave': 'Short Leave',
        'casualLeave': 'Half Day',
        'sickLeave': 'Full Day'
    };
    return categoryMap[category] || category;
}

export async function fetchAndRenderLeaves() {
    try {
        console.log("Starting to fetch leaves...");
        const response = await getLeaveRequests();
        console.log("Leave requests response:", response);
        const { results } = response;

        if (!results || results.length === 0) {
            console.log("No leave results found");
            document.querySelector(".recentLeaveContainer").innerHTML = `
                <h3 class="section-title">Recent Application:</h3>
                <p style="text-align: center; color: #666; padding: 20px;">No leave requests found</p>
            `;
            return;
        }

        console.log("Found", results.length, "leave requests");

        // Separate pending and past leaves
        const pendingLeaves = results.filter(leave => leave.status === 'pending');
        const pastLeaves = results.filter(leave => leave.status !== 'pending');

        let recentHTML = '<h3 class="section-title">Recent Application:</h3>';

        if (pendingLeaves.length === 0) {
            recentHTML += '<p style="color: #666; padding: 10px 0;">No pending applications</p>';
        } else {
            pendingLeaves.forEach(leave => {
                recentHTML += leaveCardTemplate
                    .replace('{leaveType}', formatLeaveType(leave.leaveType))
                    .replace('{firstName}', leave.firstName || 'Unknown')
                    .replace('{lastName}', leave.lastName || '')
                    .replace('{role}', leave.role || 'Staff')
                    .replace('{startDate}', formatDate(leave.startDate))
                    .replace('{endDate}', formatDate(leave.endDate))
                    .replace('{leaveCategory}', formatLeaveCategory(leave.leaveCategory))
                    .replace('{reason}', leave.reason || 'No reason provided')
                    .replace('{statusClass}', leave.status.toLowerCase())
                    .replace('{status}', leave.status.charAt(0).toUpperCase() + leave.status.slice(1));
            });
        }

        let pastHTML = '<h3 class="section-title">Past Application:</h3>';

        if (pastLeaves.length === 0) {
            pastHTML += '<p style="color: #666; padding: 10px 0;">No past applications</p>';
        } else {
            pastLeaves.forEach(leave => {
                pastHTML += leaveCardTemplate
                    .replace('{leaveType}', formatLeaveType(leave.leaveType))
                    .replace('{firstName}', leave.firstName || 'Unknown')
                    .replace('{lastName}', leave.lastName || '')
                    .replace('{role}', leave.role || 'Staff')
                    .replace('{startDate}', formatDate(leave.startDate))
                    .replace('{endDate}', formatDate(leave.endDate))
                    .replace('{leaveCategory}', formatLeaveCategory(leave.leaveCategory))
                    .replace('{reason}', leave.reason || 'No reason provided')
                    .replace('{statusClass}', leave.status.toLowerCase())
                    .replace('{status}', leave.status.charAt(0).toUpperCase() + leave.status.slice(1));
            });
        }

        const leaveContainer = document.querySelector('.recentLeaveContainer');
        if (leaveContainer) {
            leaveContainer.innerHTML = recentHTML + pastHTML;
            console.log("Leave container updated successfully");
        } else {
            console.error("Leave container not found!");
        }

    } catch (error) {
        console.error("Error fetching leave requests:", error);
        const container = document.querySelector('.recentLeaveContainer');
        if (container) {
            container.innerHTML = `
                <h3 class="section-title">Recent Application:</h3>
                <p style="text-align: center; color: #f44336; padding: 20px;">Error loading leave requests: ${error.message}</p>
            `;
        }
    }
}