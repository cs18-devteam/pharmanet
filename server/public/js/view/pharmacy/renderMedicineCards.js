import html from "./../html.js";

const medicineCardTemplate = html`
<div class="medicine_card" data-id="{id}">
    <div class="close-btn">+</div>


    <div class="dosage-icon {type}" >
        
        <svg width="20" class="{type}" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.25016 9.31234C3.09738 9.14567 3.021 8.94775 3.021 8.71859C3.021 8.48942 3.09738 8.2915 3.25016 8.12484L5.5835 5.7915L4.68766 4.89567L4.43766 5.14567C4.271 5.31234 4.07308 5.39567 3.84391 5.39567C3.61475 5.39567 3.41683 5.31234 3.25016 5.14567C3.09738 4.99289 3.021 4.79845 3.021 4.56234C3.021 4.32623 3.09738 4.13178 3.25016 3.979L4.91683 2.31234C5.0835 2.14567 5.28141 2.06234 5.51058 2.06234C5.73975 2.06234 5.93766 2.14567 6.10433 2.31234C6.25711 2.46512 6.3335 2.65956 6.3335 2.89567C6.3335 3.13178 6.25711 3.32623 6.10433 3.479L5.85433 3.729L6.75016 4.62484L9.0835 2.2915C9.25016 2.12484 9.44808 2.0415 9.67725 2.0415C9.90641 2.0415 10.1043 2.12484 10.271 2.2915C10.4377 2.45817 10.521 2.65609 10.521 2.88525C10.521 3.11442 10.4377 3.31234 10.271 3.479L9.7085 4.02067L15.8543 10.1665C16.1738 10.4859 16.3335 10.8783 16.3335 11.3436C16.3335 11.8089 16.1738 12.2012 15.8543 12.5207L15.271 13.1248L19.2085 17.0415H16.8335L14.0835 14.2915L13.5002 14.8957C13.1807 15.2151 12.7884 15.3748 12.3231 15.3748C11.8578 15.3748 11.4654 15.2151 11.146 14.8957L5.00016 8.74984L4.43766 9.31234C4.271 9.46512 4.07308 9.5415 3.84391 9.5415C3.61475 9.5415 3.41683 9.46512 3.25016 9.31234ZM6.16683 7.58317L12.3127 13.729L14.6668 11.354L13.4168 10.0832L12.2502 11.2498C12.0835 11.4026 11.8856 11.4825 11.6564 11.4894C11.4272 11.4964 11.2363 11.4234 11.0835 11.2707C10.9168 11.104 10.8335 10.9061 10.8335 10.6769C10.8335 10.4478 10.9168 10.2498 11.0835 10.0832L12.2502 8.9165L11.0002 7.6665L9.8335 8.83317C9.66683 8.98595 9.46891 9.06234 9.23975 9.06234C9.01058 9.06234 8.81266 8.98595 8.646 8.83317C8.49322 8.6665 8.41683 8.46859 8.41683 8.23942C8.41683 8.01025 8.49322 7.81234 8.646 7.64567L9.81266 6.479L8.54183 5.20817L6.16683 7.58317Z" fill="black"/>
        </svg>
        <svg class="pill" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.03125 12.25C4.11736 12.25 3.34201 11.9316 2.70521 11.2948C2.0684 10.658 1.75 9.88264 1.75 8.96875C1.75 8.53125 1.83264 8.11319 1.99792 7.71458C2.16319 7.31597 2.40139 6.96111 2.7125 6.65L6.65 2.7125C6.96111 2.40139 7.31597 2.16319 7.71458 1.99792C8.11319 1.83264 8.53125 1.75 8.96875 1.75C9.88264 1.75 10.658 2.0684 11.2948 2.70521C11.9316 3.34201 12.25 4.11736 12.25 5.03125C12.25 5.46875 12.1674 5.88681 12.0021 6.28542C11.8368 6.68403 11.5986 7.03889 11.2875 7.35L7.35 11.2875C7.03889 11.5986 6.68403 11.8368 6.28542 12.0021C5.88681 12.1674 5.46875 12.25 5.03125 12.25ZM8.91042 8.07917L10.4708 6.53333C10.6653 6.33889 10.816 6.11042 10.9229 5.84792C11.0299 5.58542 11.0833 5.31319 11.0833 5.03125C11.0833 4.44792 10.8767 3.94965 10.4635 3.53646C10.0503 3.12326 9.55208 2.91667 8.96875 2.91667C8.68681 2.91667 8.41458 2.97014 8.15208 3.07708C7.88958 3.18403 7.66111 3.33472 7.46667 3.52917L5.92083 5.08958L8.91042 8.07917ZM5.03125 11.0833C5.31319 11.0833 5.58542 11.0299 5.84792 10.9229C6.11042 10.816 6.33889 10.6653 6.53333 10.4708L8.07917 8.91042L5.08958 5.92083L3.52917 7.46667C3.33472 7.66111 3.18403 7.88958 3.07708 8.15208C2.97014 8.41458 2.91667 8.68681 2.91667 8.96875C2.91667 9.55208 3.12326 10.0503 3.53646 10.4635C3.94965 10.8767 4.44792 11.0833 5.03125 11.0833Z" fill="black"/>
        </svg>    
    </div>



    <div class="details">
        <div class="medicine__name">
            {geneticName}
        </div>
        <div class="medicine__info">
            <div class="medicine__info__store-as">
                <span>store as</span>
                <span>
                    <div class="store__info__store-as__icon">
                        <svg width="14" class="pill" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.03125 12.25C4.11736 12.25 3.34201 11.9316 2.70521 11.2948C2.0684 10.658 1.75 9.88264 1.75 8.96875C1.75 8.53125 1.83264 8.11319 1.99792 7.71458C2.16319 7.31597 2.40139 6.96111 2.7125 6.65L6.65 2.7125C6.96111 2.40139 7.31597 2.16319 7.71458 1.99792C8.11319 1.83264 8.53125 1.75 8.96875 1.75C9.88264 1.75 10.658 2.0684 11.2948 2.70521C11.9316 3.34201 12.25 4.11736 12.25 5.03125C12.25 5.46875 12.1674 5.88681 12.0021 6.28542C11.8368 6.68403 11.5986 7.03889 11.2875 7.35L7.35 11.2875C7.03889 11.5986 6.68403 11.8368 6.28542 12.0021C5.88681 12.1674 5.46875 12.25 5.03125 12.25ZM8.91042 8.07917L10.4708 6.53333C10.6653 6.33889 10.816 6.11042 10.9229 5.84792C11.0299 5.58542 11.0833 5.31319 11.0833 5.03125C11.0833 4.44792 10.8767 3.94965 10.4635 3.53646C10.0503 3.12326 9.55208 2.91667 8.96875 2.91667C8.68681 2.91667 8.41458 2.97014 8.15208 3.07708C7.88958 3.18403 7.66111 3.33472 7.46667 3.52917L5.92083 5.08958L8.91042 8.07917ZM5.03125 11.0833C5.31319 11.0833 5.58542 11.0299 5.84792 10.9229C6.11042 10.816 6.33889 10.6653 6.53333 10.4708L8.07917 8.91042L5.08958 5.92083L3.52917 7.46667C3.33472 7.66111 3.18403 7.88958 3.07708 8.15208C2.97014 8.41458 2.91667 8.68681 2.91667 8.96875C2.91667 9.55208 3.12326 10.0503 3.53646 10.4635C3.94965 10.8767 4.44792 11.0833 5.03125 11.0833Z" fill="black"/>
                        </svg>
                    </div>
                    <span class="store__info__store-as__variety">{variety}</span>
                </span>
            </div>
            <div class="medicine__info__price">
                <span>price</span>
                <span class="price">
                    <div class="price__value">{price}</div>
                    <!-- <span class="price__identifier">(average)</span> -->
                </span>
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

export function createMedicineCards (data = []){
    try{

        return data.map(medicine=>{
            let status = "not_available";
            let fullStockCount = medicine.stock.stock;
            if(fullStockCount){
                status = "available"

                if(medicine.stock.publicStock < 10){
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
                price = medicine.stock.price;
            }

            const total = price * medicine.units - medicine.discounts;


            return medicineCardTemplate
            .replaceAll('{type}' , 'syringe')
            .replaceAll('{variety}' , 'pills')
            .replace('{geneticName}' , medicine.geneticName)
            .replaceAll('{price}' , price )
            .replaceAll('{status}' , status || " ")
            .replace('{count}' , medicine.stock.publicStock)
            .replaceAll('{units}' , medicine.units || 1)
            .replaceAll('{discounts}' , medicine.discounts || 0)
            .replaceAll('{days}' , medicine.days || 1)
            .replace('{id}' , medicine.id || 0)
            .replace('{total}' , total || 0);
        });
    }catch(e){
        console.log(e);
        return undefined;
    }
}

export function renderMedicineCards(element , cards){
    try{

        if(!element) return false;
        if(cards?.length) {
            element.innerHTML = cards.join(' ');
            return true;
        }else{
            element.innerHTML = "<p style='text-align:center;color:#333;text-transform:capitalize;'>not found anything</p>";
            return false;
        }
        
    }catch(e){
        console.log(e);
        return false;
    }
}


export function renderMedicineStockSummery({count = 0 , sufficient = 0 , low = 0 , out = 0}){
    try{
        const chart = document.querySelector('.horizontal_bar_chart');
        
        const medicineFullStockCount = document.querySelector('.medicine_summery__description__amount');
        const chartLabels = chart.querySelector('.chart__labels');
        const sufficientCount = chartLabels.querySelector('.available .amount');
        const lowStockCount = chartLabels.querySelector('.low_stock .amount');
        const outOfStockCount = chartLabels.querySelector('.out_of_stock .amount');
        
        
        if(medicineFullStockCount) medicineFullStockCount.textContent = count;
        if(sufficientCount) sufficientCount.textContent = sufficient;
        if(lowStockCount) lowStockCount.textContent = low;
        if(outOfStockCount) outOfStockCount.textContent = out;

        if(!count){
            chart.style.filter = 'saturate(0.0)';
            return;
        }

        chart.querySelector('.available').style.width = `${sufficient/count * 100}%`;
        chart.querySelector('.low_stock').style.width = `${low/count * 100}%`;
        chart.querySelector('.out_of_stock').style.width = `${out/count * 100}%`;


    }catch(e){

    }
}

