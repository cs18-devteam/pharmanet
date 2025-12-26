import Application from "../../../model/application/Application.js";
import html from "../../html.js";


const chatsContainer = document.querySelector(".container.chats");

const waitingListMsg = html` <div class="msg">
                <img src="{profile}" alt="">
                <div class="name-section">
                    <span class="name">{firstName} {lastName}</span><br>
                    <span class="distance">Distance {distance} km</span>
                </div>

                <!-- <div class="view-section" >
                    <span><img src="/images/check-circle-02.svg" alt="" ></span>
                    <span >Medicine List</span>
                    <span class="view-btn"> View</span>
                </div> -->
                <div class=" btn decline-btn">Decline</div>
                <div class=" btn accept-btn">Accept</div>
            </div>`;


const template = html`

  <div class="waiting-list">
        <h1>Waiting List</h1>
        <h2>This is where people who waiting for contact your pharmacy</h2>


        <div class="msg-list">
        
        </div>


    </div>

    <div class="Instructions-section">
        <div class="title">Instructions</div>
        <h2>Instructions</h2>
        <p>if Medicine list available  ,  please check before medicine list you can fulfilled the customer requirements .if you can you can accept tha request. </p>
        <h2>what happened after accept ?</h2>
        <p>after accept , our system open chat box between you and customer. then you can discuss with customer and both parties are satisfied about order you can place order . whether you order place or not , after disconnect conversation . all conversation detail will be deleted within system</p>
    </div>
    
`;




export function renderWaitingList(){
    chatsContainer.innerHTML = template;
    const waitingList = document.querySelector(".container.chats .msg-list");
    waitingList.innerHTML = Application.waitingList.map(user=>waitingListMsg).join(' ');
}