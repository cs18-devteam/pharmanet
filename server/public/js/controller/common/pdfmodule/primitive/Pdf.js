import * as pdfPreview from "../pdfjs-dist/build/pdf.mjs";
pdfPreview.GlobalWorkerOptions.workerSrc = "/js/controller/common/pdfmodule/pdfjs-dist/build/pdf.worker.mjs";

let jsPDF = undefined;

function loadJsPDF() {
    return new Promise((resolve) => {
        try {

            const script = document.createElement("script");
            script.src = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";
            script.onload = () => resolve(window.jspdf.jsPDF);
            document.body.appendChild(script);
        } catch (e) {
            console.log(e);
            throw new Error("can't resolve");
        }
    });
}


loadJsPDF().then(() => {
    jsPDF = window.jspdf.jsPDF;
})


export default class Pdf {
    lastLinePosition = 0;
    pages = 1;

    constructor({
        name = "",
        size = [794, 1123],
        orientation = "portrait" || "landscape",
        unit = "px" || "in",
        fontSize = 16,
    } = {}) {
        this.name = name;
        this.size = size;
        this.orientation = orientation;
        this.unit = unit;
        this.fontSize = fontSize;
        this.#init();
        this.centerX = size[0] / 2;
        this.centerY = size[1] / 2;
        this.width = size[0];
        this.height = size[1];
    }

    #init() {
        this.#getDocs().then(doc => {
            doc.setFontSize(this.fontSize);

        })
    }

    async #getDocs() {
        this.loaded = false;
        try {
            if (this.doc) return this.doc;
            this.doc = await this.#createDoc();
            this.loaded = true;
            return this.doc;
        } catch (e) {
            console.log(e);
            this.loaded = false;
        }

        if (!this.loaded) return this.#getDocs();

    }


    async addHeader(text = "", fontSize = this.fontSize) {
        const doc = await this.#getDocs();
        doc.setFontSize(fontSize)

        // draw borders
        await this.line(10, 10, this.width - 10, 10);
        const llpb = this.lastLinePosition;
        await this.line(10, 12, this.width - 10, 12);
        await this.#updateLastLinePosition(llpb);
        // draw borders

        await this.text(`Title : ${this.#toCapitalize(text)}`, 20, fontSize, fontSize);
        await this.text(`Date : ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 0, 16);
        await this.text(`Page : ${this.pages}`, 20, -10, 16);
        this.#updateLastLinePosition(this.lastLinePosition - 20)


        // draw borders
        const llp = this.lastLinePosition;
        await this.line(10, 10, 10, llp);
        await this.line(12, 10, 12, llp);

        await this.line(10, llp - 2, this.width - 10, llp - 2);
        await this.line(10, llp, this.width - 10, llp);
        await this.line(this.width - 10, 10, this.width - 10, llp);
        await this.line(this.width - 12, 10, this.width - 12, llp);
        await this.#updateLastLinePosition(llp + 10);


        return;

    }


    save() {
        this.#getDocs().then(doc => {
            doc.save(`${this.name}.pdf`);
        })
    }



    async #createDoc() {
        try {
            if (jsPDF) {
                const doc = new jsPDF({
                    orientation: this.orientation,
                    unit: this.unit,
                    format: this.size
                });
                this.doc = doc;
                return doc;
            } else {
                await loadJsPDF();
                const doc = new jsPDF({
                    orientation: this.orientation,
                    unit: this.unit,
                    format: this.size
                });
                this.doc = doc;
                return doc;
            }
        } catch (e) {
            console.log(e);
            throw new Error("can't load jsPDF");
        }



    }

    #toCapitalize(text = "") {
        return text.split(' ').map(t => {
            t = t.toLowerCase();
            return t[0].toUpperCase() + t.slice(1);

        }).join(' ');
    }


    /**
     * 
     * @param {HTMLElement} element 
     */
    preview(element, page = 1) {
        if (element) {
            this.previewEl = element;
        }
        if (!this.previewEl) {
            throw new Error("can't preview")
        }

        const { width, height } = this.previewEl.getBoundingClientRect();
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            element.insertAdjacentElement('afterbegin', this.canvas);
        }
        this.canvas.width = width;
        this.canvas.height = height;
        this.#getDocs().then(async doc => {
            const blob = doc.output('blob');
            const url = URL.createObjectURL(blob);
            const loadingTask = pdfPreview.getDocument(url);
            loadingTask.promise.then((pdf) => {
                pdf.getPage(page).then(page => {
                    const viewport = page.getViewport({ scale: 1 });
                    this.canvas.width = viewport.width;
                    this.canvas.height = viewport.height;

                    page.render({
                        canvasContext: this.ctx,
                        viewport: viewport
                    });

                })
            })


        })
    }

    refresh() {
        this.preview();
    }

    async addPage() {
        const doc = await this.#getDocs();
        doc.addPage();
        this.pages++;
        this.#updateLastLinePosition(10);
        this.text(`Page : ${this.pages}`, this.width - 80, this.fontSize, 10);
        return this.pages;
    }



    async #updateLastLinePosition(value) {
        this.lastLinePosition = value;
        if (this.height - 100 < this.lastLinePosition) {
            this.addPage();
            return true;
        }

        return false;
    }

    async line(startX = 100, startY = 100, endX = 200, endY = 200) {
        const doc = await this.#getDocs();
        doc.setLineWidth(1)
        doc.line(startX, startY, endX, endY)
        doc.stroke();
        await this.#updateLastLinePosition(this.lastLinePosition + this.fontSize);
    }

    async text(text, x = 0, y = 0, fontSize = this.fontSize) {
        const doc = await this.#getDocs();
        doc.setFontSize(fontSize)
        doc.text(text, x, this.lastLinePosition + y);
        await this.#updateLastLinePosition(this.lastLinePosition + 2 * fontSize)

        return;

    }

    async absText({
        text = "",
        x = 0,
        y = 0,
        fontSize = this.fontSize,
        maxLen = undefined,
    } = {}) {

        const doc = await this.#getDocs();
        // doc.setFontSize(fontSize);
        doc.setFontSize(fontSize)
        let textboxHeight = 0;
        let textBoxWidth = maxLen || text.length * fontSize;

        if (maxLen) {
            maxLen *= 2;
            const maxChars = Math.ceil(maxLen / fontSize);

            for (let i = 0; i < Math.ceil(text.length / maxChars); i++) {
                doc.text(text.slice(maxChars * i, maxChars * (i + 1)), x, y + this.fontSize * i);
                textboxHeight = this.fontSize * (i + 2);

            }
        } else {
            await doc.text(text, x, y);
        }

        return [textBoxWidth, textboxHeight];

    }


    async table({
        data = [],
        width = 500,
        height = 500,
    } = {}) {
        const doc = await this.#getDocs();
        const [moveX, moveY] = [
            (this.width - width) / 2,
            this.lastLinePosition,
        ]

        await this.line(moveX, moveY, moveX + width, moveY);
        await this.line(moveX, moveY, moveX, moveY + height);
        await this.line(moveX + width, moveY, moveX + width, moveY + height);
        await this.line(moveX, moveY + height, moveX + width, moveY + height);


        ////////////////////////////////////
        /////////.   start HEADERs
        // ## START HEADER 
        const headers = [];
        if (!data) return;
        if(data.length == 0 ) return;
        for (const [key, value] of Object.entries(data[0])) {
            headers.push(key);
        }


        const colGap = width / headers.length;
        let rowHeight = 0;
        let lastRowPosition = moveY;
        await Promise.all(headers.map(async (header, i) => {
            const posX = moveX + i * colGap;

            if (i != 0) {
                await this.line(posX, moveY, posX, moveY + height);
            }

            const [tBoxWidth, tBoxHeight] = await this.absText({
                text: this.#toCapitalize(header),
                x: posX + this.fontSize,
                y: moveY + this.fontSize,
                maxLen: colGap,
            })

            if (rowHeight < tBoxHeight) rowHeight = tBoxHeight;
        }))
        lastRowPosition += rowHeight;
        await this.#updateLastLinePosition(this.lastLinePosition + rowHeight);

        this.line(moveX, lastRowPosition, moveX + width, lastRowPosition);

        // ### END HEADER

        rowHeight = 0;
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            await Promise.all(headers.map(async (header, i) => {

                const value = row[header];
                const [tBoxWidth, tBoxHeight] = await this.absText({
                    text: value ? String(value) : "",
                    x: moveX + colGap * i + this.fontSize,
                    y: (this.height < lastRowPosition )? moveY + this.fontSize : lastRowPosition + this.fontSize,
                    maxLen: colGap,
                });
                rowHeight = Math.max(rowHeight, tBoxHeight);
            }))
            const newPage = await this.#updateLastLinePosition(lastRowPosition);
        
            


            if (newPage ) {
                console.log(newPage);
                lastRowPosition = moveY;
                rowHeight = 0;
                await this.line(moveX, moveY, moveX + width, moveY);
                await this.line(moveX, moveY, moveX, moveY + height);
                await this.line(moveX + width, moveY, moveX + width, moveY + height);
                await this.line(moveX, moveY + height, moveX + width, moveY + height);

                await Promise.all(headers.map(async (header, i) => {
                    const posX = moveX + i * colGap;

                    if (i != 0) {
                        await this.line(posX, moveY, posX, moveY + height);
                    }
                }))


                this.#updateLastLinePosition(moveY)
            } else {
                lastRowPosition = lastRowPosition + rowHeight;
                rowHeight = 0;
                this.line(moveX, lastRowPosition, moveX + width, lastRowPosition);

            }
        }




    }



    static async standardDoc({
        name = `template-${Date.now()}`,
        fontSize = 16,
        header = "Pharmanet Document",
        data = [],
        size = [794, 1023],
        landscape ,
    } = {}) {
        const pdf = new Pdf({
            name: name,
            fontSize: fontSize,
            size: size,
            landscape : landscape,
        });

        await pdf.addHeader(header, 20);
        await pdf.table({
            width: size[0] - 20,
            height: size[1] - 120,
            data: data,
            
        })

        return pdf
    }



}