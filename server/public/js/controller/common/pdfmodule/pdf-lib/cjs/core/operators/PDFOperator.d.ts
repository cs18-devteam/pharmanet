import PDFArray from "../../../src/core/objects/PDFArray";
import PDFHexString from "../../../src/core/objects/PDFHexString";
import PDFName from "../../../src/core/objects/PDFName";
import PDFNumber from "../../../src/core/objects/PDFNumber";
import PDFString from "../../../src/core/objects/PDFString";
import PDFOperatorNames from "../../../src/core/operators/PDFOperatorNames";
import PDFContext from "../../../src/core/PDFContext";
export declare type PDFOperatorArg = string | PDFName | PDFArray | PDFNumber | PDFString | PDFHexString;
declare class PDFOperator {
    static of: (name: PDFOperatorNames, args?: PDFOperatorArg[] | undefined) => PDFOperator;
    private readonly name;
    private readonly args;
    private constructor();
    clone(context?: PDFContext): PDFOperator;
    toString(): string;
    sizeInBytes(): number;
    copyBytesInto(buffer: Uint8Array, offset: number): number;
}
export default PDFOperator;
//# sourceMappingURL=PDFOperator.d.ts.map