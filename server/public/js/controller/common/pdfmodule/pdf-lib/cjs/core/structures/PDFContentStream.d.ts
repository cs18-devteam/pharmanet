import PDFDict from "../../../src/core/objects/PDFDict";
import PDFOperator from "../../../src/core/operators/PDFOperator";
import PDFContext from "../../../src/core/PDFContext";
import PDFFlateStream from "../../../src/core/structures/PDFFlateStream";
declare class PDFContentStream extends PDFFlateStream {
    static of: (dict: PDFDict, operators: PDFOperator[], encode?: boolean) => PDFContentStream;
    private readonly operators;
    private constructor();
    push(...operators: PDFOperator[]): void;
    clone(context?: PDFContext): PDFContentStream;
    getContentsString(): string;
    getUnencodedContents(): Uint8Array;
    getUnencodedContentsSize(): number;
}
export default PDFContentStream;
//# sourceMappingURL=PDFContentStream.d.ts.map