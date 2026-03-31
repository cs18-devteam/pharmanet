import PDFDict from "../../../src/core/objects/PDFDict";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFAcroTerminal from "../../../src/core/acroform/PDFAcroTerminal";
declare class PDFAcroSignature extends PDFAcroTerminal {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroSignature;
}
export default PDFAcroSignature;
//# sourceMappingURL=PDFAcroSignature.d.ts.map