import html from "../html.js";

export function createMedicineViewerContent(medicine){
    if(!medicine) return "";

    console.log(medicine);
    

    const isAvailable = medicine.stock.stock;
    const stock = {
        full : medicine?.stock?.stock,
        public : medicine?.stock?.publicStock,
        private: 0 , 
        publicPercentage:100,
        privatePercentage : 0,
    }

    stock.private = stock.full - stock.public;
    if(stock.private){
        stock.publicPercentage = ( stock.public / stock.full  * 100).toFixed(2);
        stock.privatePercentage = (100 - Number(stock.publicPercentage)).toFixed(2);

    }

    console.log(stock);
    
    
    console.log(isAvailable);
    console.log(medicine);
    



    return html`
        <div class="medicine-viewer" data-id="${medicine.id}">

            <div class="topbar">
                <div class="mini-header">
                    <h1 class="medicine_name">
                        ${medicine.geneticName}
                    </h1>
                    <div class="tag ${isAvailable ? "available" : "not_available"}"> ${isAvailable ? "available" : "not available"} </div>
                </div>
                
                <div class="actions">
                    <!-- <div class="bookmark"></div> -->
                   ${!isAvailable ? "" : `<div class="edit">edit</div>` }
                    <div class="close" onclick="this.closest('.drawer').setAttribute('status' , 'close')">close</div>
                </div>

                
            </div>


            <div class="content">
                <div class="left">
                    <table class="details">
                        <tbody>
                            <tr class="row">
                                <td>genetic name</td>
                                <td>${medicine.geneticName}</td>
                            </tr>
                            <tr class="row">
                                <td>brand</td>
                                <td>${medicine.brand}</td>
                            </tr>
                            <tr class="row">
                                <td>country</td>
                                <td>${medicine.country}</td>
                            </tr>
                            <tr class="row">
                                <td>schedule</td>
                                <td>${medicine.schedule}</td>
                            </tr>
                            <tr class="row">
                                <td>registration number</td>
                                <td>${medicine.registrationNo}</td>
                            </tr>
                            <tr class="agent">
                                <td>agent</td>
                                <td>${medicine.agent}</td>
                            </tr>
                            <tr class="row">
                                <td>registration date</td>
                                <td>${new Date(medicine.registrationDate).toDateString()}</td>
                            </tr>
                            <tr class="row">
                                <td>manufacture</td>
                                <td>${medicine.manufacture}</td>
                            </tr>
                            <tr class="row">
                                <td>pack type</td>
                                <td>${medicine.packType}</td>
                            </tr>
                            <tr class="row">
                                <td>pack size</td>
                                <td>${medicine.packSize}</td>
                            </tr>
                            <tr class="row">
                                <td>dosage</td>
                                <td>${medicine.packType}</td>
                            </tr>
                            <tr class="row">
                                <td>validation</td>
                                <td>${medicine.validation}</td>
                            </tr>
                            <tr class="row">
                                <td>dossier number</td>
                                <td>${medicine.dossierNo}</td>
                            </tr>
                        </tbody>
                    </table>



                </div>
                <div class="right">
                    ${isAvailable ? html`
                    <div class="price_container">
                        <div class="text">
                            
                        <svg class="label-icon" width="20" height="20" viewBox="0 0 20 20"            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_546_1581)">
                            <path d="M10.6583 17.5001L2.5 9.3418V11.0085C2.5 11.4501 2.675 11.8751 2.99167 12.1835L9.48333 18.6751C10.1333 19.3251 11.1917 19.3251 11.8417 18.6751L17.0167 13.5001C17.6667 12.8501 17.6667 11.7918 17.0167 11.1418L10.6583 17.5001Z" fill="black"/>
                            <path d="M9.48333 14.5083C9.80833 14.8333 10.2333 15 10.6583 15C11.0833 15 11.5083 14.8333 11.8333 14.5083L17.0083 9.33333C17.6583 8.68333 17.6583 7.625 17.0083 6.975L10.5167 0.483333C10.2083 0.175 9.78333 0 9.34167 0H4.16667C3.25 0 2.5 0.75 2.5 1.66667V6.84167C2.5 7.28333 2.675 7.70833 2.99167 8.01667L9.48333 14.5083ZM4.16667 1.66667H9.34167L15.8333 8.15833L10.6583 13.3333L4.16667 6.84167V1.66667Z" fill="black"/>
                            <path d="M6.04167 4.58333C6.61696 4.58333 7.08333 4.11696 7.08333 3.54167C7.08333 2.96637 6.61696 2.5 6.04167 2.5C5.46637 2.5 5 2.96637 5 3.54167C5 4.11696 5.46637 4.58333 6.04167 4.58333Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_546_1581">
                            <rect width="20" height="20" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                            
                            price (1 item)
                            
                        </div>
                        
                        <div class="price">${medicine.stock.price}</div>
                            
                        
                        </div>
                        
                        <div class="stock_details_container ">
                        <h2>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9371 4.12622L13.2016 1.06483C13.0474 0.434339 12.501 0 11.8635 0H2.13291C1.50242 0 0.948986 0.441345 0.801871 1.06483L0.0662966 4.12622C-0.101835 4.84078 0.0522858 5.56935 0.500636 6.1438C0.55668 6.22086 0.63374 6.2769 0.696789 6.34696V11.2088C0.696789 11.9794 1.32728 12.6098 2.09788 12.6098H11.9055C12.6761 12.6098 13.3066 11.9794 13.3066 11.2088V6.34696C13.3697 6.28391 13.4467 6.22086 13.5028 6.1508C13.9511 5.57636 14.1123 4.84078 13.9371 4.12622ZM11.8425 1.39409L12.5781 4.45548C12.6481 4.74971 12.5851 5.04394 12.4029 5.27512C12.3049 5.40122 12.0947 5.60438 11.7444 5.60438C11.3171 5.60438 10.9458 5.26111 10.8968 4.80575L10.4904 1.40109L11.8425 1.39409ZM7.70226 1.40109H9.07533L9.45363 4.56757C9.48866 4.84078 9.40459 5.11399 9.22245 5.31715C9.06833 5.4993 8.84415 5.60438 8.55693 5.60438C8.08756 5.60438 7.70226 5.19105 7.70226 4.68666V1.40109ZM4.54279 4.56757L4.92809 1.40109H6.30117V4.68666C6.30117 5.19105 5.91587 5.60438 5.39746 5.60438C5.15927 5.60438 4.9421 5.4993 4.77397 5.31715C4.59884 5.11399 4.51477 4.84078 4.54279 4.56757ZM1.42536 4.45548L2.13291 1.40109H3.51299L3.10667 4.80575C3.05063 5.26111 2.68634 5.60438 2.25901 5.60438C1.91574 5.60438 1.69857 5.40122 1.6075 5.27512C1.41835 5.05094 1.3553 4.74971 1.42536 4.45548ZM2.09788 11.2088V6.98446C2.15393 6.99146 2.20297 7.00547 2.25901 7.00547C2.86849 7.00547 3.42192 6.75327 3.82823 6.33995C4.24856 6.76028 4.809 7.00547 5.4465 7.00547C6.05597 7.00547 6.6024 6.75327 7.00872 6.35396C7.42204 6.75327 7.98248 7.00547 8.61297 7.00547C9.20143 7.00547 9.76187 6.76028 10.1822 6.33995C10.5885 6.75327 11.1419 7.00547 11.7514 7.00547C11.8075 7.00547 11.8565 6.99146 11.9125 6.98446V11.2088H2.09788Z" fill="#1A7F78"/>
                        </svg>

                            
                            stock details
                        </h2>

                        <div class="full_stock">
                            ${stock.full} items in stock

                        </div>
                        
                        
                        <div class="public_stock_container stock_card">
                            <div class="title">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99935 12.8337C6.1924 12.8337 5.43407 12.6805 4.72435 12.3743C4.01463 12.068 3.39727 11.6524 2.87227 11.1274C2.34727 10.6024 1.93164 9.98505 1.62539 9.27533C1.31914 8.5656 1.16602 7.80727 1.16602 7.00033C1.16602 6.19338 1.31914 5.43505 1.62539 4.72533C1.93164 4.0156 2.34727 3.39824 2.87227 2.87324C3.39727 2.34824 4.01463 1.93262 4.72435 1.62637C5.43407 1.32012 6.1924 1.16699 6.99935 1.16699C7.80629 1.16699 8.56463 1.32012 9.27435 1.62637C9.98407 1.93262 10.6014 2.34824 11.1264 2.87324C11.6514 3.39824 12.0671 4.0156 12.3733 4.72533C12.6796 5.43505 12.8327 6.19338 12.8327 7.00033C12.8327 7.80727 12.6796 8.5656 12.3733 9.27533C12.0671 9.98505 11.6514 10.6024 11.1264 11.1274C10.6014 11.6524 9.98407 12.068 9.27435 12.3743C8.56463 12.6805 7.80629 12.8337 6.99935 12.8337ZM6.99935 11.667C8.30213 11.667 9.4056 11.2149 10.3098 10.3107C11.2139 9.40658 11.666 8.3031 11.666 7.00033C11.666 6.93227 11.6636 6.86178 11.6587 6.78887C11.6539 6.71595 11.6514 6.65519 11.6514 6.60658C11.6028 6.88852 11.4716 7.12185 11.2577 7.30658C11.0438 7.4913 10.791 7.58366 10.4993 7.58366H9.33268C9.01185 7.58366 8.7372 7.46942 8.50872 7.24095C8.28025 7.01248 8.16602 6.73783 8.16602 6.41699V5.83366H5.83268V4.66699C5.83268 4.34616 5.94692 4.07151 6.17539 3.84303C6.40386 3.61456 6.67852 3.50033 6.99935 3.50033H7.58268C7.58268 3.27671 7.64345 3.07984 7.76497 2.9097C7.8865 2.73956 8.03477 2.60102 8.20977 2.49408C8.01532 2.44546 7.81845 2.40658 7.61914 2.37741C7.41984 2.34824 7.21324 2.33366 6.99935 2.33366C5.69657 2.33366 4.5931 2.78574 3.68893 3.68991C2.78477 4.59408 2.33268 5.69755 2.33268 7.00033H5.24935C5.89102 7.00033 6.44032 7.2288 6.89727 7.68574C7.35421 8.14269 7.58268 8.69199 7.58268 9.33366V9.91699H5.83268V11.5212C6.02713 11.5698 6.21914 11.6062 6.40872 11.6305C6.59831 11.6548 6.79518 11.667 6.99935 11.667Z" fill="black"/>
                            </svg>

                                public
                            </div>
                            <p>
                                This products are visible to <span style="color: var(--color-green-01)"> everyone </span>,
                                and everyone can see them using our system.
                            </p>
                            
                            <div class="content">
                            <div class="bar_graph">
                                <div style="width:${stock.publicPercentage}%" class="row">${stock.publicPercentage}</div>
                            </div>
                            
                            <div class="quantity">
                                <div class="count">${stock.public}</div>
                                <div>items</div>
                            </div>
                            </div>
                            
                            
                        </div>
                        
                        
                        <div class="private_stock_container stock_card">
                            <div class="title">
                                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.58333 3.79167H7.04167V2.70833C7.04167 1.21333 5.82833 0 4.33333 0C2.83833 0 1.625 1.21333 1.625 2.70833V3.79167H1.08333C0.4875 3.79167 0 4.27917 0 4.875V10.2917C0 10.8875 0.4875 11.375 1.08333 11.375H7.58333C8.17917 11.375 8.66667 10.8875 8.66667 10.2917V4.875C8.66667 4.27917 8.17917 3.79167 7.58333 3.79167ZM2.70833 2.70833C2.70833 1.80917 3.43417 1.08333 4.33333 1.08333C5.2325 1.08333 5.95833 1.80917 5.95833 2.70833V3.79167H2.70833V2.70833ZM7.58333 10.2917H1.08333V4.875H7.58333V10.2917ZM4.33333 8.66667C4.92917 8.66667 5.41667 8.17917 5.41667 7.58333C5.41667 6.9875 4.92917 6.5 4.33333 6.5C3.7375 6.5 3.25 6.9875 3.25 7.58333C3.25 8.17917 3.7375 8.66667 4.33333 8.66667Z" fill="black"/>
                                </svg>
                            private
                            </div>
                            <p>
                            This product is only visible to you.
                            </p>
                            <div class="content">
                            <div 
                                class="bar_graph" 
                                style="opacity:${stock.private ? 1 : 0};">
                                <div style="width:${stock.privatePercentage || '0'}%;" class="row">${stock.privatePercentage}</div>
                            </div>
                            
                            <div class="quantity">
                                <div class="count">${stock.private}</div>
                                <div>items</div>
                            </div>
                            </div>
                            
                        
                        
                        </div>
                        
                        </div>
                    
                    ` : 
                        
                        html`
                        <div class="notice">
                        <h3 class="title">you don't have this medicine</h3>
                        <button class="add_to_stock">add to stock</button>
                    `
                    }
                        
                    </div>
                
                </div>
            </div>

        </div>
    `    
};