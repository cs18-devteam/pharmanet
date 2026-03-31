import PDFDict from "../../../src/core/objects/PDFDict";
import PDFName from "../../../src/core/objects/PDFName";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFAcroField from "../../../src/core/acroform/PDFAcroField";
import PDFWidgetAnnotation from "../../../src/core/annotation/PDFWidgetAnnotation";
declare class PDFAcroTerminal extends PDFAcroField {
    static fromDict: (dict: PDFDict, ref: PDFRef) => PDFAcroTerminal;
    FT(): PDFName;
    getWidgets(): PDFWidgetAnnotation[];
    addWidget(ref: PDFRef): void;
    removeWidget(idx: number): void;
    normalizedEntries(): {
        Kids: import("../../../src/core/objects/PDFArray").default;
    };
}
export default PDFAcroTerminal;
//# sourceMappingURL=PDFAcroTerminal.d.ts.map