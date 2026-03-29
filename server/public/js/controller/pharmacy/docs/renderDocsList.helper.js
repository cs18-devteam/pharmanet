export default function renderDocsList(container , reports){
    if(!container) return;
    container.textContent = '';
    container.classList.remove("editorMode");
    
    reports.forEach(r=>r.render(container));
    
}