import PDFObject from "../../../src/core/objects/PDFObject";
import PDFString from "../../../src/core/objects/PDFString";
import PDFHexString from "../../../src/core/objects/PDFHexString";
import PDFArray from "../../../src/core/objects/PDFArray";
import PDFName from "../../../src/core/objects/PDFName";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFAcroTerminal from "../../../src/core/acroform/PDFAcroTerminal";
declare class PDFAcroButton extends PDFAcroTerminal {
    Opt(): PDFString | PDFHexString | PDFArray | undefined;
    setOpt(opt: PDFObject[]): void;
    getExportValues(): (PDFString | PDFHexString)[] | undefined;
    removeExportValue(idx: number): void;
    normalizeExportValues(): void;
    /**
     * Reuses existing opt if one exists with the same value (assuming
     * `useExistingIdx` is `true`). Returns index of existing (or new) opt.
     */
    addOpt(opt: PDFHexString | PDFString, useExistingOptIdx: boolean): number;
    addWidgetWithOpt(widget: PDFRef, opt: PDFHexString | PDFString, useExistingOptIdx: boolean): PDFName;
}
export default PDFAcroButton;
//# sourceMappingURL=PDFAcroButton.d.ts.map