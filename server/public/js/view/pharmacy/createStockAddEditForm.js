import html from './../html.js';

const sidebar = html`
    <div class="pharmacy_medicine_stock_content">
        <h2 class="medicine_name">{medicineName}</h2>
        <form class="medicine-edit-form" data-id="1">
            <div class="input_field_container">

                <h3>price information</h3>
                <div class="field">
                    <label for="price">price</label>
                    <input type="number" value="{price}" name="price" min="0" id="price">
                </div>
                
                <h3>stock information</h3>
                <div class="field">
                    <label for="stock">stock</label>
                    <input type="number" name="stock" value="{stock}" min="0" id="stock">
                </div>
                
                <div class="field">
                    <label for="public_stock">public stock</label>
                    <input type="number" value="{public_stock}" name="publicStock" min="0" id="public_stock">
                </div>
            
            </div>


            {buttons}
        </form>
    </div>
`;






export function createStockAddEditForm(medicine){
    console.log(medicine);
    

    return sidebar
    .replace('{medicineName}' , medicine?.geneticName)
    .replace('{price}' , medicine?.stock?.price || '')
    .replace('{stock}' , medicine?.stock?.stock || '')
    .replace('{public_stock}' , medicine?.stock?.publicStock || '')
    .replace('{buttons}' , html`
        <div class="buttons">
                <button class="btn_cancel close">cancel</button>
                ${medicine?.stock?.stock ? html`
                <button class="btn_save">save</button>`: html`
                <button class="btn_add_to_stock">add to stock</button>`}
        </div>`)
}