import Application from "../../../model/application/Application.js";
import Docs from "./Docs.class.js";
import renderDownloadButton from "./downloadButton.js";
import renderPageCount from "./render.pageCount.helper.js";
import renderBackButton from "./renderBackButton.js";
import renderPDFEditor from "./renderPDFEditor.helpler.js";

const pharmacyProductReport = new Docs("Products Stock Report" , "products");

/**
 * 
 * @param {} e 
 * @param {Docs} report 
 */
async function pharmacyReportGenerator(e , report) {
    const reportContainer = document.querySelector(".reports_container");
    reportContainer.textContent = '';
    const [preview , editor] = renderPDFEditor(reportContainer , report.name);

    const {data} = await report.request({
        query : `pharmacyId = ${Application.pharmacyId}`
    })

    if(!data) return;
    console.log(data);
    const productData = data.map(d=>{
        const {id , name , brand , category , price ,quantity} = d;
        return {
            id,
            name, 
            brand,
            "Price (Rs)": price,
            quantity,
            category,
        }

    })


    const pdf = await report.PDF().standardDoc({
        name :"medicine stock report  || pharmanet",
        data : productData,
        header:"Full Products Stock Report"
    })
    renderDownloadButton(editor , async ()=>{
       await pdf.save();
    });
    renderPageCount(editor , pdf.pages);    

    

    renderBackButton(reportContainer , editor);

    await pdf.preview(preview);
}


pharmacyProductReport.attachCallBack(pharmacyReportGenerator)



export default pharmacyProductReport;