import { Position } from "../../../src/core/errors";
import PDFArray from "../../../src/core/objects/PDFArray";
import PDFDict from "../../../src/core/objects/PDFDict";
import PDFHexString from "../../../src/core/objects/PDFHexString";
import PDFName from "../../../src/core/objects/PDFName";
import PDFNumber from "../../../src/core/objects/PDFNumber";
import PDFObject from "../../../src/core/objects/PDFObject";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFStream from "../../../src/core/objects/PDFStream";
import PDFString from "../../../src/core/objects/PDFString";
import BaseParser from "../../../src/core/parser/BaseParser";
import ByteStream from "../../../src/core/parser/ByteStream";
import PDFContext from "../../../src/core/PDFContext";
declare class PDFObjectParser extends BaseParser {
    static forBytes: (bytes: Uint8Array, context: PDFContext, capNumbers?: boolean | undefined) => PDFObjectParser;
    static forByteStream: (byteStream: ByteStream, context: PDFContext, capNumbers?: boolean) => PDFObjectParser;
    protected readonly context: PDFContext;
    constructor(byteStream: ByteStream, context: PDFContext, capNumbers?: boolean);
    parseObject(): PDFObject;
    protected parseNumberOrRef(): PDFNumber | PDFRef;
    protected parseHexString(): PDFHexString;
    protected parseString(): PDFString;
    protected parseName(): PDFName;
    protected parseArray(): PDFArray;
    protected parseDict(): PDFDict;
    protected parseDictOrStream(): PDFDict | PDFStream;
    protected findEndOfStreamFallback(startPos: Position): number;
}
export default PDFObjectParser;
//# sourceMappingURL=PDFObjectParser.d.ts.map