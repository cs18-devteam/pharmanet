const Bridge = require("../../common/Bridge");
const { apiCatchAsync } = require("../../common/catchAsync");
const { createCookie } = require("../../common/cookie");
const ipaddress = require("../../common/ipaddress");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const connectedPharmacies = require("../../memory/pharmacies.memory.temp");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Products = require("../../models/ProductModel");
const Users = require("../../models/UserModel");


exports.renderPharmacy = async (req , res)=>{
    try{

        return response(res , view("pharmacy") , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}


exports.renderPharmacyRegister = async (req , res)=>{
    try{
        if(!req.customerId) return responseJson(res  , 302 , {status:"error"})
        const customer = (await Users.getById(req.customerId))[0];

        return response(res,view('customer/pharmacy.register' , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            navbar : view('customer/navbar.customer' , customer) , 
            id : customer.id
        }),200);

    }catch(e){
        console.log(e);
        return response(200 , view('404') , 400);
    }

}

exports.renderPharmacyProfile = async (req , res)=>{
    try{

        const [staff] = (await Users.getById(req.pharmacistId));
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
        
        if(!staff) return '404 : No Staff Member';
        
        return  response( res ,view('pharmacy/pharmacy.profile' , {
            navbar : view('navbar.staff' , {...staff , name:`${staff.firstName} ${staff.lastName}`}) , 
            ownerId : staff.id,
            pharmacyId: staff.id,
            name :"lanka pharmacy",
            addressNo:'B124',
            street: 'kandy road',
            town:"abilipitiya",
            contact :"078123 2123 ",
            email: 'xyz@gmail.com',
            pharmacistId:staff.id,
        }))
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}


exports.renderPharmacyDashboard = async (req , res)=>{
    try{

        const pharmacyId = req.pharmacyId;
        const staffId = req.staffId;
        
        const [pharmacy] =await Pharmacies.getById(pharmacyId);
        const [staffMember] =await PharmacyStaff.getById(staffId);

        const [totalProducts] = await Products.query(`select count(*) as total from this.table where pharmacyId = ${pharmacyId}`);
        const [lowStockProduct] = await Products.query(`select count(*) as total from this.table where pharmacyId = ${pharmacyId} and quantity < 10`);
        const [outofStockProducts] = await Products.query(`select count(*) as total from this.table where pharmacyId = ${pharmacyId} and quantity <= 0`);

        
        if(!pharmacy){
            throw new Error("pharmacy not found");
        }
        
        if(!staffMember){
            throw new Error("staff not found");
        }

        return response(res , view('pharmacy/pharmacy.dashboard' , {
            transactionsView : view('pharmacy/views/dashboard.transactions.view'),
            staffView : view('pharmacy/views/dashboard.staff.view'),
            chatsView : view('pharmacy/views/dashboard.chats.view'),
            productsView : view('pharmacy/views/dashboard.product.view' , {
                total : totalProducts.total  ,
                lowstock : lowStockProduct.total ,
                outofstock  : outofStockProducts.total, 
            }),
            medicinesView : view('pharmacy/views/dashboard.medicines.view'),
            ordersView : view('pharmacy/views/dashboard.orders.view'),
            docsView : view('pharmacy/views/dashboard.docs.view'),
            header : view('component.header' , {
                name:"Pharmacy Dashboard",
            }),
        }) , 200 , {
            "Set-Cookie" : [
                createCookie('staffId' , staffMember.id) ,
                createCookie('pharmacyId' , pharmacy.id) ,
                createCookie('id' , staffMember.userId) ,
                createCookie('ip' , ipaddress)
            ] 
        })
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}



exports.sendOnlinePharmacies = async (req , res)=>{
    try{
        let pharmacies = Object.entries(connectedPharmacies).map(([_,pClient])=>{
            return Pharmacies.getById(pClient.id);
        })

        pharmacies = await Promise.all(pharmacies);
        pharmacies = pharmacies.map(p=>p[0]);


        return responseJson(res, 200 , {
            status:"success",
            results: pharmacies,
            count: pharmacies.length,
        })


    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:'error',
            message:"something wrong",
            error:e,
        })
    }
}


exports.deletePharmacy = apiCatchAsync(async (req , res)=>{
    const pharmacyId = req.pharmacyId;
    if(!pharmacyId) throw new Error("no pharmacy id");


    const [pharmacy] = await Pharmacies.getById(pharmacyId);
    if(!pharmacy) throw new Error("no pharmacy found");


    const medicines =  await PharmacyMedicines.get({
        pharmacyId : pharmacy.id , 
    })

    await Promise.all(medicines.map( async m=>{
       return await PharmacyMedicines.deleteById(m.id); 
    }));

    const products = await Products.get({
        pharmacyId : pharmacy.id ,
    })

    await Promise.all(products.map(async p=>{
        return await Products.getById(p.id);
    }))

    const staff = await PharmacyStaff.get({
        pharmacyId : pharmacy.id ,
    })

    await Promise.all(staff.map(async s=>{
        await Users.deleteById(s.userId)
        return await PharmacyStaff.deleteById(s.id);
    }))

    await Pharmacies.deleteById(pharmacy.id);


    return responseJson(res , 200 , {
        status:"success",
        message:"pharmacy deleted successful"
    })

    
})


