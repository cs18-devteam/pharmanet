import html from "../html.js";

const requestCardTemplate =   html`
    <div class="pharmacy-request" id="{id}">
        <div class="request-btn" data-id="{id}">
            <button>request</button>
        </div>

        <div class="pharmacy-details">
            <div class="name">
            {name}
            </div>
            
            
            <div class="address">
            {no} , {street} , {town}
            </div>
            
            <div class="additional-details">
            <div class="status">{status}</div>
            <div class="distance">{distance}Km</div>
            </div>
            
        </div>
        
        <div class="available">{med-status}</div>
        <div class="points">
            <img src="/cart/coin.svg">
            {points} points
        </div>
</div>

`;


export function createRequestCards(data=[]){

    return data.map(pharmacy=>{
        return requestCardTemplate
            .replace('{id}' , pharmacy.id)
            .replace('{id}' , pharmacy.id)
            .replace('{name}' , pharmacy.name)
            .replace('{med-status}' , pharmacy.medStatus || '')
            .replace('{no}' , pharmacy.addressNo || '')
            .replace('{street}' , pharmacy.street || '')
            .replace('{town}' , pharmacy.town || '')
            .replace('{town}' , pharmacy.town || '')
            .replace('{status}' , pharmacy.alive ? 'open' : 'close')
            .replace('{points}' , 0);
    })
}


export function renderRequestCards(el , cards){
    el.innerHTML = cards.join(' ');
}