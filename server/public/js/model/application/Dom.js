export default class Dom{
    constructor(){
    
    }

    static content(htmlEl = document.body){
        return htmlEl.innerHTML;
    }


    static replaceContent(htmlEl = document.body , newContent = ""){
        htmlEl.innerHTML = newContent;
        return newContent;
    }

    static appendElement(htmlEl = document.body , childNode = document.createElement('div')){
        htmlEl.appendChild(childNode);
        return htmlEl;
    }
}