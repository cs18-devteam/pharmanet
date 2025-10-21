export default class Utilities{
    static #window = document.createElement('div');

    static init(){
        document.body.appendChild(this.#window);
    }
    
    static renderSpinner(message = " "){
        this.#window.innerHTML = `<div class="spinner">${message}<div>`;
    }

    static removeSpinner(){
        this.#window.innerHTML = " ";

    }
}


Utilities.init();