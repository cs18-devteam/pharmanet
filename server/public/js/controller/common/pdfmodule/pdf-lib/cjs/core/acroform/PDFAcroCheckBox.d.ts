import PDFContext from "../../../src/core/PDFContext";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFDict from "../../../src/core/objects/PDFDict";
import PDFName from "../../../src/core/objects/PDFName";
import PDFAcroButton from "../../../src/core/acroform/PDFAcroButton";
declare class PDFAcroCheckBox extends PDFAcroButton {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroCheckBox;
    static create: (context: PDFContext) => PDFAcroCheckBox;
    setValue(value: PDFName): void;
    getValue(): PDFName;
    getOnValue(): PDFName | undefined;
}
export default PDFAcroCheckBox;
//# sourceMappingURL=PDFAcroCheckBox.d.ts.map