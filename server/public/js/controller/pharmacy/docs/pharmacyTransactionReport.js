import Application from "../../../model/application/Application.js";
import Docs from "./Docs.class.js";
import renderDownloadButton from "./downloadButton.js";
import renderPageCount from "./render.pageCount.helper.js";
import renderBackButton from "./renderBackButton.js";
import renderPDFEditor from "./renderPDFEditor.helpler.js";

const pharmacyTransactionsReport = new Docs("Transactions Report" , "transactions");

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
        // query : `pharmacyId = ${Application.pharmacyId}`
    })

    if(!data) return;
    console.log(data);
    const productData = data.map(d=>{
        const {id , transactionDateTime , staffID, userId , amount} = d;
        return {
            id,
            date : new Date(transactionDateTime).toUTCString(), 
            "Amount (Rs)" : amount,
            "Staff ID" : staffID || "-",
            "User ID" : userId || "-",
        }

    })


    const pdf = await report.PDF().standardDoc({
        name :"Transactions Report  || pharmanet",
        data : productData,
        header:"Full Transactions Report",
        fontSize: 14,
    })
    renderDownloadButton(editor , async ()=>{
       await pdf.save();
    });

    renderPageCount(editor , pdf.pages);

    

    renderBackButton(reportContainer , editor);

    await pdf.preview(preview);
}


pharmacyTransactionsReport.attachCallBack(pharmacyReportGenerator)



export default pharmacyTransactionsReport;