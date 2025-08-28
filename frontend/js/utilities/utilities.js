export default class Utilities{
    constructor(){}

    static replaceTag(target , tag){
        const newTag = document.createElement(tag);
        newTag.innerHTML =target.innerHTML;

        for(let attr of target.attributes){
            newTag.setAttribute(attr.name , attr.value);
        }

        target.replaceWith(newTag);

        return newTag;

    }


}