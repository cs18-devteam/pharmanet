import PDFCrossRefSection from "../../../src/core/document/PDFCrossRefSection";
import PDFHeader from "../../../src/core/document/PDFHeader";
import PDFTrailer from "../../../src/core/document/PDFTrailer";
import PDFTrailerDict from "../../../src/core/document/PDFTrailerDict";
import PDFDict from "../../../src/core/objects/PDFDict";
import PDFObject from "../../../src/core/objects/PDFObject";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFContext from "../../../src/core/PDFContext";
export interface SerializationInfo {
    size: number;
    header: PDFHeader;
    indirectObjects: [PDFRef, PDFObject][];
    xref?: PDFCrossRefSection;
    trailerDict?: PDFTrailerDict;
    trailer: PDFTrailer;
}
declare class PDFWriter {
    static forContext: (context: PDFContext, objectsPerTick: number) => PDFWriter;
    protected readonly context: PDFContext;
    protected readonly objectsPerTick: number;
    private parsedObjects;
    protected constructor(context: PDFContext, objectsPerTick: number);
    serializeToBuffer(): Promise<Uint8Array>;
    protected computeIndirectObjectSize([ref, object]: [PDFRef, PDFObject]): number;
    protected createTrailerDict(): PDFDict;
    protected computeBufferSize(): Promise<SerializationInfo>;
    protected shouldWaitForTick: (n: number) => boolean;
}
export default PDFWriter;
//# sourceMappingURL=PDFWriter.d.ts.map