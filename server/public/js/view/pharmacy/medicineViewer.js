import html from "../html.js";
// import {html} from 'lit-html';

export function createMedicineViewerContent(medicine){
    if(!medicine) return "";

    const isAvailable = medicine.stock.stock;




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
                    <div class="edit">edit</div>
                    <div class="close">close</div>
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
                    
                
                </div>
            </div>

        </div>
    `    
};