import PDFRawStream from "../../../src/core/objects/PDFRawStream";
import PDFObjectParser from "../../../src/core/parser/PDFObjectParser";
declare class PDFObjectStreamParser extends PDFObjectParser {
    static forStream: (rawStream: PDFRawStream, shouldWaitForTick?: (() => boolean) | undefined) => PDFObjectStreamParser;
    private alreadyParsed;
    private readonly shouldWaitForTick;
    private readonly firstOffset;
    private readonly objectCount;
    constructor(rawStream: PDFRawStream, shouldWaitForTick?: () => boolean);
    parseIntoContext(): Promise<void>;
    private parseOffsetsAndObjectNumbers;
}
export default PDFObjectStreamParser;
//# sourceMappingURL=PDFObjectStreamParser.d.ts.map