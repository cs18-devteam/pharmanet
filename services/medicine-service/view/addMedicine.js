//const fs = require('fs');
//const path = require ('path');

//const getAllMedicine = fs.readFileSync(path.join(__dirname ,'./../templates/getProducts.template.html') , 'utf-8');
//const productCardTemplate = fs.readFileSync(path.join(__dirname ,'./../templates/productCard.template.html') , 'utf-8');

// console.log(productCardTemplate)


//exports.renderAllProducts  = (req, res)=>{
    //res.writeHead(200 , {'content-type':'text/html'});

    //let productCards = [];

    //req.results.forEach(data=>{
     //   productCards.push(productCardTemplate.replace("%%PRODUCT-NAME%%" , data.name).replace('%%PRODUCT-PRICE%%' , data.price))
    //})


   // res.write(getAllMedicine.replace('%%PRODUCT-CARDS%%' , productCards.join(' ')));
    //res.end();
//}