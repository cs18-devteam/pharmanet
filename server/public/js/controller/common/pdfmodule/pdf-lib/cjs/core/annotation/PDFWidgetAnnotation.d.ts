import PDFDict from "../../../src/core/objects/PDFDict";
import PDFName from "../../../src/core/objects/PDFName";
import PDFRef from "../../../src/core/objects/PDFRef";
import PDFString from "../../../src/core/objects/PDFString";
import PDFHexString from "../../../src/core/objects/PDFHexString";
import PDFContext from "../../../src/core/PDFContext";
import BorderStyle from "../../../src/core/annotation/BorderStyle";
import PDFAnnotation from "../../../src/core/annotation/PDFAnnotation";
import AppearanceCharacteristics from "../../../src/core/annotation/AppearanceCharacteristics";
declare class PDFWidgetAnnotation extends PDFAnnotation {
    static fromDict: (dict: PDFDict) => PDFWidgetAnnotation;
    static create: (context: PDFContext, parent: PDFRef) => PDFWidgetAnnotation;
    MK(): PDFDict | undefined;
    BS(): PDFDict | undefined;
    DA(): PDFString | PDFHexString | undefined;
    P(): PDFRef | undefined;
    setP(page: PDFRef): void;
    setDefaultAppearance(appearance: string): void;
    getDefaultAppearance(): string | undefined;
    getAppearanceCharacteristics(): AppearanceCharacteristics | undefined;
    getOrCreateAppearanceCharacteristics(): AppearanceCharacteristics;
    getBorderStyle(): BorderStyle | undefined;
    getOrCreateBorderStyle(): BorderStyle;
    getOnValue(): PDFName | undefined;
}
export default PDFWidgetAnnotation;
//# sourceMappingURL=PDFWidgetAnnotation.d.ts.map