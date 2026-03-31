import PDFDict from "../../../src/core/objects/PDFDict";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFContext from "../../../src/core/PDFContext";
import PDFAcroField from "../../../src/core/acroform/PDFAcroField";
declare class PDFAcroNonTerminal extends PDFAcroField {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroNonTerminal;
    static create: (context: PDFContext) => PDFAcroNonTerminal;
    addField(field: PDFRef): void;
    normalizedEntries(): {
        Kids: import("../../../src/core/objects/PDFArray").default;
    };
}
export default PDFAcroNonTerminal;
//# sourceMappingURL=PDFAcroNonTerminal.d.ts.map