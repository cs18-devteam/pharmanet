import Application from "../../../model/application/Application.js";
import Docs from "./Docs.class.js";
import renderDownloadButton from "./downloadButton.js";
import renderPageCount from "./render.pageCount.helper.js";
import renderBackButton from "./renderBackButton.js";
import renderPDFEditor from "./renderPDFEditor.helpler.js";

const pharmacyStockReport = new Docs("Medicine Stock Report" , "pharmacyMedicines");

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

    let mediData = []
    if(data){
        mediData = await Promise.all(data.map(async d=> {
            const {data} = await report.request({
                query :`id = ${d.medicineId}`,
                fields: "geneticName",
                model :"medicines"
            })
            if(!data[0]) return d;

            const {geneticName} = data[0];
            const {id, medicineId , price ,stock , publicStock} = d;

            return {
                stockId :id,
                medicineId,
                geneticName,
                "price (Rs)" :price,
                publicStock,
                
                
            };
        }))
        
    }

    const pdf = await report.PDF().standardDoc({
        name :"medicine stock report  || pharmanet",
        data : mediData,
        header:"Full Medicines Stock Report"
    })
    renderDownloadButton(editor , async ()=>{
       await pdf.save();
    });


    renderPageCount(editor , pdf.pages);    

    renderBackButton(reportContainer , editor);

    await pdf.preview(preview);
}


pharmacyStockReport.attachCallBack(pharmacyReportGenerator)



export default pharmacyStockReport;