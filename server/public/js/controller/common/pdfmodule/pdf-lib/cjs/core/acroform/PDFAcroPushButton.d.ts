import PDFDict from "../../../src/core/objects/PDFDict";
import PDFAcroButton from "../../../src/core/acroform/PDFAcroButton";
import PDFContext from "../../../src/core/PDFContext";
import PDFRef from "../../../src/core/objects/PDFRef";
declare class PDFAcroPushButton extends PDFAcroButton {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroPushButton;
    static create: (context: PDFContext) => PDFAcroPushButton;
}
export default PDFAcroPushButton;
//# sourceMappingURL=PDFAcroPushButton.d.ts.map