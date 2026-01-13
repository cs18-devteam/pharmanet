const drawer = document.querySelector('.drawer');
const drawerSidebar = document.querySelector(".drawer-sidebar");

let drawerStatus = false;
let updatedTime = undefined;

const drawerOutsideListener = (e)=>{
    // const isDrawerOpened = drawer.getAttribute("status") == "open";
    const timeDef = Date.now() - updatedTime;
    
    if(timeDef < 10) return;

    const isNotDrawer = !e.target.closest('.drawer');


    if(isNotDrawer && drawerStatus){
        console.log('drawer closed');
        closeDrawer();
    }
}
document.body.addEventListener('click' ,drawerOutsideListener);


export function openDrawer(e){
    if(e) e.stopPropagation();
    drawerStatus = true;
    updatedTime = Date.now();
    drawer.setAttribute('status' , 'open'); 

}

export function closeDrawer(){
    drawerStatus = false;
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

