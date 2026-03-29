export default function renderDownloadButton(editor , func){
    const downloadButton = document.createElement("button");
    downloadButton.classList.add("download_pdf");
    downloadButton.textContent = "download";
    editor.insertAdjacentElement("beforeend" , downloadButton);

    downloadButton.addEventListener('click' ,func)
}