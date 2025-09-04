const allElements = Array.from(document.querySelector('body').children);

const intersectionObserver = new IntersectionObserver((entries)=>{
    const [entry] = entries;
    entry.target.classList.remove("utility-hidden");
} , {
    root:null,
    threshold: .1,
})



allElements.forEach(( el ,index)=>{
    // if(index < 2) return;

    if(el.tagName == "script") return;

    // Check if element is initially visible
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if(isVisible) return;

    intersectionObserver.observe(el);
    el.classList.add('utility-transition')
    el.classList.add('utility-hidden');
    
})