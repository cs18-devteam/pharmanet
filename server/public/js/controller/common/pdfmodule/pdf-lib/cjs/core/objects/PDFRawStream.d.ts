import PDFDict from "../../../src/core/objects/PDFDict";
import PDFStream from "../../../src/core/objects/PDFStream";
import PDFContext from "../../../src/core/PDFContext";
declare class PDFRawStream extends PDFStream {
    static of: (dict: PDFDict, contents: Uint8Array) => PDFRawStream;
    readonly contents: Uint8Array;
    private constructor();
    asUint8Array(): Uint8Array;
    clone(context?: PDFContext): PDFRawStream;
    getContentsString(): string;
    getContents(): Uint8Array;
    getContentsSize(): number;
}
export default PDFRawStream;
//# sourceMappingURL=PDFRawStream.d.ts.map