/*
const fs = require('fs');
const path = require ('path');

const getAllMedicine = fs.readFileSync(path.join(__dirname ,'./../templates/addMedicine.template.html') , 'utf-8');
const medicineCardTemplate = fs.readFileSync(path.join(__dirname ,'./../templates/inventoryCardtemplate.html') , 'utf-8');

// console.log(productCardTemplate)


exports.renderAllMedicines  = (req, res)=>{
    res.writeHead(200 , {'content-type':'text/html'});

    let MedicineCards = [];

    req.results?.forEach(data=>{
        if(!data)return
       MedicineCards.push(medicineCardTemplate

            .replace("%%MEDICINE-NAME%%", data?.name)
            .replace("%%CATEGORY%%", data?.categoryId)
            .replace("%%TYPE%%", data?.typeId)
            .replace("%%PRICE%%", data?.price)
            .replace("%%STOCK%%", data?.stock)
            .replace("%%MANUFACTURE%%", data?.manufacture)
            .replace("%%DATE%%", data?.expiryDate))

    })
   res.write(getAllMedicine.replace('%%ADD-MEDICINE%%' , MedicineCards.join(' ')));
    res.end();
}*/

