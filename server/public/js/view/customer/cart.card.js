import html from "../html.js";

const template = html`<div class="cart_item" data-id="{id}">
    <div class="content">
        <img src="{image}" alt="">
        <div class="description">
            <h4>
                <div>Name</div>
                <div>{name}</div>
            
            </h4>
            <div class="price">
                <div class="label">
                    <img src="/cart/tag.svg" alt="🏷️">
                    price
                </div>
                <div class="amount">1,234</div>
            </div>

        </div>
    </div>


    <div class="action-box {state}">
        <div class="select">
            <input type="checkbox" id="select-{id}" name="id"  data-id="{id}">
            <label class="text" for="select-{id}">select</label>
            
            <div class="remove-from-cart-btn">&#10005</div>

        </div>
        

        <div class="remove">
            <input type="checkbox" id="remove-{id}" data-id="{id}" >
            <label class="text" for="remove-{id}">
                <img src="/cart/remove.svg" alt="X">
                remove
                
            </label>
        </div>

        <div class="available">
            <input type="checkbox" id="available-{id}" data-id="{id}" >
            <label class="text" for="available-{id}">
                <img src="/cart/available.svg" alt="X">
                available
                
            </label>
        </div>

        <div class="added">
            <input type="checkbox" id="added-{id}" data-id="{id}" >
            <label class="text" for="added-{id}">
                <img src="/cart/added.svg" alt="X">
                added
                
            </label>
        </div>
        
    </div>


</div>`;




export function createCartCards(data){


    return data.map(cart=>{
        return template
                    .replace('{state}' , 'select')
                    .replace('{name}' , cart.medicineId ? cart.geneticName : cart.name)
                    .replace('{image}' , cart.image)
                    .replaceAll("{id}",  cart.id);
    })
}


