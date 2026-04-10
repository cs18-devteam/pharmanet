import html from "../../view/html.js";

class QuickNotify{

    constructor({topic = '' , value = '' , priority = "low" , changeWindowTo} = {}){
        this.topic = topic,
        this.value = value,
        this.priority = priority;
        this.changeWindowTo = changeWindowTo
    }


    createHTMl(id){
        return html`
            <div id="notify-${id}" data-id="${id}" class="quick-notify ${this.priority}">
                <div class="topic">${this.topic}</div>
                <div class="value">${this.value}</div>
            </div>
        `
    }
}


const notifications = [];
notifications.push(new QuickNotify({
    topic :"low stock",
    value : "fkasjfdkjf jfkajfksafj s kfjkafjaskfjsa. kjkljfa",
    priority : "high",
    changeWindowTo :"medicines"
}))
notifications.push(new QuickNotify({
    topic :"out of stock",
    value : "dfskafjsaklfjask jkasjfkslajfsadk ;f me",
    priority : "low",
    changeWindowTo :"medicines"
}))
notifications.push(new QuickNotify({
    topic :"hi",
    value : "medium",
    priority : "medium",
    changeWindowTo :"medicines"
}))
notifications.push(new QuickNotify({
    topic :"hi",
    value : "dsfskafjsakfjaklfjk",
    priority : "high",
    changeWindowTo :"medicines"
}))
notifications.push(new QuickNotify({
    topic :"hi",
    value : "fuck me",
    priority : "high",
    changeWindowTo :"medicines"
}))

export default function init(){
    const quickLook = document.querySelector(".quick_look");
    if(!quickLook) return;
    const div = document.createElement("div");
    div.classList.add("quick_look_notify_container");
    quickLook.insertAdjacentElement("beforeend" , div);

    if(notifications.length){
        quickLook.classList.add("active")
    }else{
        quickLook.classList.remove("active")
        return;
    }

    div.insertAdjacentHTML("beforeend" , notifications.map((n , i)=>n.createHTMl(i+1)).join(" "));

}



async function update() {
    try{

    }catch(e){
        console.log(e);
    }
}

