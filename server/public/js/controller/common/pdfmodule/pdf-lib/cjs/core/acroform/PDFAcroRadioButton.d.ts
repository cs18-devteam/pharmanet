import PDFRef from "../../../src/core/objects/PDFRef";
import PDFDict from "../../../src/core/objects/PDFDict";
import PDFName from "../../../src/core/objects/PDFName";
import PDFAcroButton from "../../../src/core/acroform/PDFAcroButton";
import PDFContext from "../../../src/core/PDFContext";
declare class PDFAcroRadioButton extends PDFAcroButton {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroRadioButton;
    static create: (context: PDFContext) => PDFAcroRadioButton;
    setValue(value: PDFName): void;
    getValue(): PDFName;
    getOnValues(): PDFName[];
}
export default PDFAcroRadioButton;
//# sourceMappingURL=PDFAcroRadioButton.d.ts.map