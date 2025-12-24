import Application from "../../model/application/Application.js";

        const realFileBtn = document.getElementById("fileUpload");
        const customBtn = document.getElementById("custom-btn");
        

        //after select file
        realFileBtn.addEventListener("change", async () => {
            console.log("gdstfgygkg");
            if(!realFileBtn.files.length) return ;

            const formData = new FormData();
            formData.append("prescription" , realFileBtn.files[0]);
            formData.append("customerid", Application.userId )           

            const res = await fetch("/api/v1/orders/upload", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
        

        });
        
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
        
