import Docs from "./Docs.class.js";


const systemManual = new Docs("System Manual (Hand book)" , "products");

/**
 * 
 * @param {} e 
 * @param {Docs} report 
 */
async function pharmacyReportGenerator(e , report) {
    const pdf = `/manual/User Manual.pdf`;
    const link = document.createElement("a");
    link.href = pdf;
    link.download = "User Manual.pdf"; // file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}


systemManual.attachCallBack(pharmacyReportGenerator)



export default systemManual;