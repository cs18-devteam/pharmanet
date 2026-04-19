import Application from "../../model/application/Application.js";
import { fetchLowStocks } from "../../model/pharmacy/fetchMedicineData.js";
import { getStatusSummery } from "../../model/pharmacy/orders.js";
import html from "../../view/html.js";
import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";

class QuickNotify {

    constructor({ topic = '', value = '', priority = "low", changeWindowTo = "orders" } = {}) {
        this.topic = topic,
            this.value = value,
            this.priority = priority;
        this.changeWindowTo = changeWindowTo
    }


    createHTMl(id) {
        return html`
            <div data-window="${this.changeWindowTo}" id="notify-${id}" data-id="${id}" class="quick-notify ${this.priority}">
                <div class="topic">${this.topic}</div>
                <div class="value">${this.value}</div>
            </div>
        `
    }
}


let notifications = [];
let interval = 1000;
let quickLook;
let div;


export default function init() {
    quickLook = document.querySelector(".quick_look");
    if (!quickLook) return;
    div = document.createElement("div");
    div.classList.add("quick_look_notify_container");
    quickLook.insertAdjacentElement("beforeend", div);


    setTimeout(updateView, 1000);
    setInterval(updateView, 60000);


    quickLook.addEventListener("click", e => {
        const { target } = e;
        const notify = target.closest(".quick-notify");
        if (notify) {
            changeWindowTo(notify.dataset.window);
        }
    })


}


async function updateView() {
    const data = await update();
    if (Application.pharmacyId) interval = 60000;

    notifications = [];
    data.map(s => {
        let topic = ""
        let priority = ""
        let changeWindowTo = s.type == "medicine" ? "medicines" : "products";
        let value = s.name;


        if (s.status) {
            if((s.status == "pending" || s.status == null) &&  0 < s.count ){
                return notifications.push(new QuickNotify({
                    topic :`(${s.count}) Pending Orders`,
                    value : `${s.count} remain`,
                    priority:"high",
                    changeWindowTo : "orders",
                }))
            }else if(s.status == "processing" && 0 < s.count){
                return notifications.push(new QuickNotify({
                    topic :`(${s.count}) Processing Orders`,
                    value : `${s.count} remain`,
                    priority :"medium",
                    changeWindowTo :"orders",
                }))
            }
        }

        if (s.quantity) {
            if (10 <= s.quantity) {
                topic = "low stock"
                priority = "low";
            } else if (s.quantity < 1) {
                topic = "out of  stock";
                priority = "high"
            } else if (s.quantity < 10) {
                topic = "low stock";
                priority = "medium";
            }


            return notifications.push(new QuickNotify({
                topic,
                priority,
                changeWindowTo,
                value,
            }))

        }


    })

    if (notifications.length) {
        quickLook.classList.add("active")
    } else {
        quickLook.classList.remove("active")
        return;
    }

    div.innerHTML = ""
    div.insertAdjacentHTML("beforeend", notifications.map((n, i) => n.createHTMl(i + 1)).join(" "));
}



async function update() {
    try {
        const stock = await fetchLowStocks(Application.pharmacyId);
        const orderStatus = await getStatusSummery();

        const stockData = stock.status == "success" ? stock.data : [];
        const statusData = orderStatus.status == "success" ? orderStatus.data : [];
        return [...stockData, ...statusData];


    } catch (e) {
        console.log(e);
    }
}

