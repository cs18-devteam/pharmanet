import Application from "../../../model/application/Application.js";
import Pdf from "../../common/pdfmodule/index.js";

export default class Docs{
    callback = ()=>{};
    /**
     * 
     * @param {string} name 
     * @param {"products" | "medicines" | "pharmacies" | "transactions" | "orders" | "pharmacyMedicines" } model 
     */
    constructor(name = "" , model){
        this.name = name;
        this.model = model
    }
    /**
     * 
     * @param {HTMLElement} el 
     */
    render(el){
        if(!el) return;
        const report = document.createElement("div");
        report.classList.add("report");
        const reportName = document.createElement("span");
        reportName.classList.add("report__name");
        reportName.textContent = this.name;
        const button = document.createElement("button");
        button.textContent = "generate";
        button.classList.add("download");

        report.insertAdjacentElement('beforeend', button);
        report.insertAdjacentElement('beforeend', reportName);

        el.insertAdjacentElement( "beforeend" , report);
        button.addEventListener('click' , (e) =>this.callback(e , this));

    }

    async request({ query , fields , model} = {}){
        try{
            const res = await fetch("/api/v1/docs/" + Application.pharmacyId , {
                method :"POST",
                body : JSON.stringify({
                    query , 
                    fields,
                    model : model || this.model,
                })
            });

            if(!res.ok) throw new Error("response not ok");
            
            const data = await res.json();
            return data;

        }catch(e){
            console.log(e);
            return [];
        }
    }


    attachCallBack(func = ()=>{}){
        this.callback = func;
    }


    PDF(){
        return Pdf;
    }



    /**
     * 
     * @param {*} param0 
     * @returns {Pdf}
     */
    generatePDF({
        name  = this.name , fontSize = 16 , orientation = "portrait" , size  = [794 , 1023]
    } = {}){
        const pdf = new Pdf({
            name,
            fontSize , 
            orientation , 
            unit : "px" , 
            size,

        });

        return pdf;
    }

}
