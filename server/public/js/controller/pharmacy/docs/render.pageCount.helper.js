import html from "../../../view/html.js";

export default function renderPageCount(container , pages){
    if(!container) return;
    container.insertAdjacentHTML('beforeend' , html`
        <div class="page_count">
            <span>Number of Pages : </span><span>${pages || 1}</span>
        </div>    
    `)
}