export default class Utilities{
    static id = 0;
    constructor(){}

    static replaceTag(target , tag){
        const newTag = document.createElement(tag);
        newTag.dataset.uniqueid = this.id;
        newTag.innerHTML =target.innerHTML;
        
        for(let attr of target.attributes){
            newTag.setAttribute(attr.name , attr.value);
        }
        
        target.replaceWith(newTag);
        
        const el = document.querySelector(`${tag}[data-uniqueid="${this.id}"]`);
        this.id ++;
        return el;

    }


}