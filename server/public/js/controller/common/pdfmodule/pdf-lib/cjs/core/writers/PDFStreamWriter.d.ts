import PDFHeader from "../../../src/core/document/PDFHeader";
import PDFTrailer from "../../../src/core/document/PDFTrailer";
import PDFObject from "../../../src/core/objects/PDFObject";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFContext from "../../../src/core/PDFContext";
import PDFWriter from "../../../src/core/writers/PDFWriter";
declare class PDFStreamWriter extends PDFWriter {
    static forContext: (context: PDFContext, objectsPerTick: number, encodeStreams?: boolean, objectsPerStream?: number) => PDFStreamWriter;
    private readonly encodeStreams;
    private readonly objectsPerStream;
    private constructor();
    protected computeBufferSize(): Promise<{
        size: number;
        header: PDFHeader;
        indirectObjects: [PDFRef, PDFObject][];
        trailer: PDFTrailer;
    }>;
}
export default PDFStreamWriter;
//# sourceMappingURL=PDFStreamWriter.d.ts.map