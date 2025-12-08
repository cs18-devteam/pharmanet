const { response } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const Users = require("../../models/UserModel");


exports.renderCustomerPharmacies = async (req , res)=>{
    try{

        const customer = (await Users.getById(req.customerId))[0];
        const pharmacies = await Pharmacies.get();

        if(!customer) return view('404');
        return response(res , view('customer/customer.search.pharmacies' , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            ...customer,
            count : pharmacies.length ,
            navbar : view('customer/navbar.customer' ,customer) ,
            results : pharmacies.map(pharmacy=>view('customer/pharmacy.search.card' , {
                ...pharmacy , 
                customerId : customer.id
            })).join(' ')

        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404' , {
            header : view('component.header' , {
          name:"Antibiotics",
        })
        }) , 400);
    }

}


exports.renderCustomerPharmacy = async (req , res)=>{
    try{
    const customer = (await Users.getById(req.customerId))[0];
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);

        if(!customer) return view('404');
        return response(res , view('pharmacy/pharmacy.profile' , {
            ...customer,
            ...pharmacy , 
            navbar : view('customer/navbar.customer' ,customer) ,
            customerId : customer.id
        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }





}


exports.renderPharmacyLandingPage = async (req , res)=>{
    try{
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
        console.log(pharmacy);


        const pharmacyData = {
            ...pharmacy , 
            contact1 : pharmacy.contact ,
            contact2 : "****"
        }


        const medicines = await PharmacyMedicines.get({
            pharmacyId : pharmacy.id,
        })

     

        const medicineCards = medicines.map(async m=>{
            const [medicine] = await Medicines.getById(m.medicineId);
            return view('customer/component.medicine.card' , {
                id: m.id,
                price : m.price , 
                publicStock : m.publicStock,
                name : medicine.geneticName,
                image : medicine.image,
            })
        })

        const medicineCardsText = await Promise.all(medicineCards)

        return response(res , view("customer/customer.pharmacy.landingPage" , {
            navbar : view('customer/navbar.customer' ,{}) ,
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            ...pharmacyData,
            medicineCards : medicineCardsText.join(' '),

            // {...pharmacy , contact1 : pharmacy.contact , contact2 : ""}
            
        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }
}





