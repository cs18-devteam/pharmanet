const drawer = document.querySelector('.drawer');
const drawerSidebar = document.querySelector(".drawer-sidebar");
export function openDrawer(){
    drawer.setAttribute('status' , 'open'); 
}

export function closeDrawer(){
    drawer.setAttribute('status' , 'close'); 
}

export function setDrawerContent(html){
    drawer.innerHTML = html;
}

export function attachDrawer(elements){
    if(elements instanceof Array ){
        elements.forEach(el=>el.addEventListener('click' , openDrawer));
    }else if(elements instanceof HTMLCollection){
        Array.from(elements).forEach(el=>el.addEventListener('click',openDrawer));
    }else{
        elements.addEventListener('click' , openDrawer);
    }
}

export function openSidebar(){
    drawerSidebar?.setAttribute('status' , 'open');
}
export function closeSidebar(){
    drawerSidebar?.setAttribute('status' , 'close');
}

export function setSidebarContent(html){
    const content = drawerSidebar.querySelector('.sidebar_content');
    if(content) content.innerHTML = html;
}


drawerSidebar?.addEventListener('click' , (e)=>{
    const sidebar = e.target.closest('.sidebar_content');
    const closeBtn = e.target.closest('.close');
    if(!sidebar) closeSidebar();
    if(closeBtn) closeSidebar();
});

