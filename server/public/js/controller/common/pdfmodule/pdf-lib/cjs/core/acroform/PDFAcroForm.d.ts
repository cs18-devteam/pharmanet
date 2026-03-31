import PDFContext from "../../../src/core/PDFContext";
import PDFDict from "../../../src/core/objects/PDFDict";
import PDFArray from "../../../src/core/objects/PDFArray";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFAcroField from "../../../src/core/acroform/PDFAcroField";
declare class PDFAcroForm {
    readonly dict: PDFDict;
    static fromDict: (dict: PDFDict) => PDFAcroForm;
    static create: (context: PDFContext) => PDFAcroForm;
    private constructor();
    Fields(): PDFArray | undefined;
    getFields(): [PDFAcroField, PDFRef][];
    getAllFields(): [PDFAcroField, PDFRef][];
    addField(field: PDFRef): void;
    removeField(field: PDFAcroField): void;
    normalizedEntries(): {
        Fields: PDFArray;
    };
}
export default PDFAcroForm;
//# sourceMappingURL=PDFAcroForm.d.ts.map