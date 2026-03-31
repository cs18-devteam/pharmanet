import PDFDict from "../../../src/core/objects/PDFDict";
import PDFAcroChoice from "../../../src/core/acroform/PDFAcroChoice";
import PDFContext from "../../../src/core/PDFContext";
import PDFRef from "../../../src/core/objects/PDFRef";
declare class PDFAcroComboBox extends PDFAcroChoice {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroComboBox;
    static create: (context: PDFContext) => PDFAcroComboBox;
}
export default PDFAcroComboBox;
//# sourceMappingURL=PDFAcroComboBox.d.ts.map