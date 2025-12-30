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

}