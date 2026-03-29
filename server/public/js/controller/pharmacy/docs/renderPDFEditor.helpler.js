import html from "../../../view/html.js";
/**
 * 
 * @param {HTMLElement} root 
 */
export default function renderPDFEditor(root ,name){
    if(!root) return;
    root.classList.add("editorMode");
    const preview = document.createElement("div");
    preview.classList.add("preview");
    const edit = document.createElement("div");
    edit.classList.add('editor');
    root.insertAdjacentElement('beforeend',preview);
    root.insertAdjacentElement('beforeend',edit);

    const reportName  = html`
        <div class="reportName">
            ${name}
        </div>
    `

    edit.insertAdjacentHTML("beforeend" , reportName)
    return [preview , edit];
    
}
