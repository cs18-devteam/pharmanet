import { getStaffData } from "../../../model/pharmacy/fetchStaffData.js";
import html from "../../../view/html.js";


const template = html`
            <div class="staff-item" data-id="{userId}" data-staffId="{staffId}">
                <img src="{profile}" alt="avatar" />
                <div class="info">
                <h4>{firstName} {lastName}</h4>
                <span>{role}</span>
                </div>
            </div>
`


export async function fetchAndRenderStaff() {
    const {results} = await getStaffData();
    const allStaffCards = results.map(member=>template
        .replace( "{userId}"  , member.userId)
        .replace( "{staffId}"  , member.staffId)
        .replace( "{profile}"  , member.profile)
        .replace( "{role}"  , member.role)
        .replace( "{firstName}"  , member.firstName)
        .replace( "{lastName}"  , member.lastName)
    ).join(" ");

    const staffCardList = document.querySelector(".staff .staff-list");
    staffCardList.innerHTML = allStaffCards;

    // Show actions when staff item is clicked
    document.querySelectorAll(".staff-item").forEach((item) => {
      item.addEventListener("click", function () {
        document.querySelector(".recentLeaveContainer").style.display = "none";
        document.querySelector(".actions").style.display = "block";
      });
    });

    // Optional: Go back to leave container from actions
    document
      .querySelector(".recentLeaveContainer")
      .addEventListener("click", function () {
        if (event.target.closest(".back-btn")) {
          document.querySelector(".recentLeaveContainer").style.display =
            "block";
          document.querySelector(".actions").style.display = "none";
        }
      });

      // Detect clicks outside to reset view
    document.addEventListener("click", function(event) {
      const staffItem = document.querySelector(".staff-item");
      const actions = document.querySelector(".actions");
      const recentLeave = document.querySelector(".recentLeaveContainer");
      
      // Check if click is outside staff-list and actions
      if (!staffItem.contains(event.target) && !actions.contains(event.target)) {
        recentLeave.style.display = "block";
        actions.style.display = "none";
      }
    });

}