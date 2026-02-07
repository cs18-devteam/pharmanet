/**
 * 
 * @param {string} text 
 */
export function renderText(text , parent = document.body){
    const div = document.createElement("div");
    div.classList.add("text-animation")
    for(let i = 0 ; i < text.length ; i++){
        const letter = document.createElement('span');
        letter.textContent = text[i];
        div.appendChild(letter);
    }

    parent.appendChild(div);

    return div;
}