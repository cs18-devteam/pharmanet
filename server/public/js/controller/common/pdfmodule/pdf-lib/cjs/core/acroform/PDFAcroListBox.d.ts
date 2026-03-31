import PDFDict from "../../../src/core/objects/PDFDict";
import PDFAcroChoice from "../../../src/core/acroform/PDFAcroChoice";
import PDFContext from "../../../src/core/PDFContext";
import PDFRef from "../../../src/core/objects/PDFRef";
declare class PDFAcroListBox extends PDFAcroChoice {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroListBox;
    static create: (context: PDFContext) => PDFAcroListBox;
}
export default PDFAcroListBox;
//# sourceMappingURL=PDFAcroListBox.d.ts.map