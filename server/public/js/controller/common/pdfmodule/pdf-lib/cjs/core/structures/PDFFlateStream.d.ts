import PDFDict from "../../../src/core/objects/PDFDict";
import PDFStream from "../../../src/core/objects/PDFStream";
import { Cache } from "../../../src/utils";
declare class PDFFlateStream extends PDFStream {
    protected readonly contentsCache: Cache<Uint8Array>;
    protected readonly encode: boolean;
    constructor(dict: PDFDict, encode: boolean);
    computeContents: () => Uint8Array;
    getContents(): Uint8Array;
    getContentsSize(): number;
    getUnencodedContents(): Uint8Array;
}
export default PDFFlateStream;
//# sourceMappingURL=PDFFlateStream.d.ts.map