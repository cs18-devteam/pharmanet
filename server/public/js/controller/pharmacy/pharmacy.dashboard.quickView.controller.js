import Application from "../../model/application/Application.js";
import { fetchLowStocks } from "../../model/pharmacy/fetchMedicineData.js";
import html from "../../view/html.js";

class QuickNotify {

    constructor({ topic = '', value = '', priority = "low", changeWindowTo } = {}) {
        this.topic = topic,
            this.value = value,
            this.priority = priority;
        this.changeWindowTo = changeWindowTo
    }


    createHTMl(id) {
        return html`
            <div id="notify-${id}" data-id="${id}" class="quick-notify ${this.priority}">
                <div class="topic">${this.topic}</div>
                <div class="value">${this.value}</div>
            </div>
        `
    }
}


const notifications = [];


export default function init() {
    const quickLook = document.querySelector(".quick_look");
    console.log("hi");
    if (!quickLook) return;
    const div = document.createElement("div");
    div.classList.add("quick_look_notify_container");
    quickLook.insertAdjacentElement("beforeend", div);



    setInterval(async () => {
        const data = await update();
        console.log(data);

        data.map()

        if (notifications.length) {
            quickLook.classList.add("active")
        } else {
            quickLook.classList.remove("active")
            return;
        }


        div.insertAdjacentHTML("beforeend", notifications.map((n, i) => n.createHTMl(i + 1)).join(" "));
    }, 1000);



}



async function update() {
    try {
        const res = await fetchLowStocks(Application.pharmacyId);
        if (res.status == "error") return [];
        return res.data;


    } catch (e) {
        console.log(e);
    }
}

