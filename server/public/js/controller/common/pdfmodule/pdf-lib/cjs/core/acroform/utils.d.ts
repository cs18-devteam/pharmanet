import PDFDict from "../../../src/core/objects/PDFDict";
import PDFArray from "../../../src/core/objects/PDFArray";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFAcroField from "../../../src/core/acroform/PDFAcroField";
export declare const createPDFAcroFields: (kidDicts?: PDFArray | undefined) => [PDFAcroField, PDFRef][];
export declare const createPDFAcroField: (dict: PDFDict, ref: PDFRef) => PDFAcroField;
//# sourceMappingURL=utils.d.ts.map