import Application from "../../model/application/Application.js";
import html from "../html.js";

const productCardTemplate = html`
<div class="medicine_card product_card" data-type="product" data-id="{id}">
    <div class="close-btn">+</div>

    <div class="details">
        <img src="{image}" />
        <div>

            <div class="medicine__name">
                {name}
            </div>
            <div class="medicine__info">
                
                <div class="medicine__info__price">
                    <span>price</span>
                    <span class="price">
                        <div class="price__value">{price}</div>
                        <!-- <span class="price__identifier">(average)</span> -->
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="stock {status}">
        <div class="stock__tag ">
            <div class="available">available</div>
            <div class="low_stock">low stock</div>
            <div class="out_of_stock">out of stock</div>
        </div>
        <div class="stock__amount">{count}</div>
    </div>

    <div class="order-add-form {status}">
        <div class="input">
            <label>
                <span>Units</span>
                <input name="units" type="number" min="0" max="{count}" value={units}/>
            </label>
        </div>
        <div class="input">
            <label>
                <span>Days</span>
                <input name="days" type="number" min="0" value="{days}"/>
            </label>
        </div>

        <div class="input">
            <label>
                <span>Discounts</span>
                <input name="discounts" type="number" min="0" max="{price}" value="{discounts}"/>
            </label>
        </div>

        <button class="add">Add</button>
    </div>
    
    
        
    <div class="cart_item_details">
        <div class="cart_item_details__summery">    
            <span>Rs {price}</span>
            <span>x</span>
            <span>{units} (Units)</span>
            <span>&nbsp;</span>
            <span> - Rs {discounts} (Discounts)</span>
            
        </div>

        <div class="cart_item_details__total">Rs {total}</div>
        
        
    </div>
    
</div> 


`;



export function createProductCards (data = []){
    try{
        return data.map(product=>{
            let status = "not_available";
            let fullStockCount = product.quantity;
            if(fullStockCount){
                status = "available"

                if(fullStockCount < 10){
                    status = "low_stock";
                }
            }else if(fullStockCount == 0){
                status = "out_of_stock";
            }

            if(fullStockCount == undefined){
                fullStockCount = ' ';
            }

            let price = 'not available';
            if(status != 'not_available'){
                price = product.price;
            }


            let total  = price * product.units - product.discounts;;

            return productCardTemplate
            .replaceAll('{variety}' , 'pills')
            .replace('{name}' , product.name)
            .replaceAll('{price}' , price )
            .replaceAll('{status}' , status || " ")
            .replace('{count}' , product.quantity || 0)
            .replaceAll('{units}' , product.units || 1)
            .replaceAll('{discounts}' , product.discounts || 0)
            .replaceAll('{days}' , product.days || 1)
            .replace('{id}' , product.id || 0)
            .replace('{image}' , product.image || 0)
            .replace("{total}" , total)
        });
    }catch(e){
        console.log(e);
        return undefined;
    }
}