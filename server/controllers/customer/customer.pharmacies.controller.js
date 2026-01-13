const File = require("../../common/File");
const getMultipartData = require("../../common/getMultipartData");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");


exports.renderCustomerPharmacies = async (req , res)=>{
    try{

        const [customer] = await Users.getById(req.customerId);
        const pharmacies = await Pharmacies.get();

        if(!customer) return view('404');
        return response(res , view('customer/customer.pharmacies.view' , {
            header : view('component.header' , {
                name:"Pharmacies",
            }),
            ...customer,
            count : pharmacies.length ,
            navbar : view('customer/navbar.customer' ,customer) ,
            footer: view('footer'),
            topRatedPharmacies : pharmacies.map(pharmacy=>view('customer/component.pharmacy.card' , {
                ...pharmacy , 
                customerId : customer.id
            })).join(' '),
            cart : view('customer/component.cart'),
            nearByPharmacyCards : ''

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


async function saveFile(name , file , destination){
    try{

        const fileName = `${name}-${Date.now()}-${file.fileName}`;
        file.rename(fileName);
        const regSaveData = await file.save(destination);
        if(regSaveData.status == "success"){
            regSaveData.destination = destination+"/"+fileName;
            return regSaveData;
        }else{
            throw new Error("address proof file cannot saved");
        }
    }catch(e){
        throw e;
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
            customerId : customer.id,
            cart : view('customer/component.cart')
        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }





}


exports.renderPharmacyLandingPage = async (req , res)=>{
    try{
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
        const [customer] = await Users.getById(req.customerId);
        if(!customer) throw new Error("customer not found");


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
            navbar : view('customer/navbar.customer' , customer) ,
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            carts: view('components/component.cart.card'),
            ...pharmacyData,
            medicineCards : medicineCardsText.join(' '),
            cart : view('customer/component.cart'),
            status:pharmacy.alive ? "online" : "offline",

            // {...pharmacy , contact1 : pharmacy.contact , contact2 : ""}
            
        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }
}



exports.createPharmacy = async (req , res)=>{
    await Pharmacies.query("start transaction");


    try{
        const pharmacyData = await getMultipartData(req);
        const [customer] = await Users.getById(req.customerId);

        if(!customer){
            throw new Error('customer is not found');
        }

        const pharmacyObj = {
            name : pharmacyData.name,
            licenseNumber : pharmacyData.licenseNumber,
            email : pharmacyData.email,
            expireDate : pharmacyData.expireDate,
            addressNo : pharmacyData.addressNo,
            street : pharmacyData.street,
            town : pharmacyData.street,
            province : pharmacyData.province,
            latitude : pharmacyData.latitude,
            longitude : pharmacyData.longitude,
            googleMapLink : pharmacyData.googleMapLink,
            contact : pharmacyData.contact , 
            postalCode : pharmacyData.postalCode,
            pharmacist : pharmacyData.pharmacist || `${customer.firstName} ${customer.lastName}` , 
            type : pharmacyData.type,
            owner : pharmacyData.owner || `${customer.firstName} ${customer.lastName}`,
            pharmacistLicense : pharmacyData.pharmacistLicense,
            registrationDoc : undefined,
            ownerDoc : undefined,
            addressDoc : undefined,
            img : '/pharmacyImages/general-pharmacy.png',
        };


        if(pharmacyData.registrationDoc instanceof File){
            const file = await saveFile(pharmacyData.name ,pharmacyData.registrationDoc , "/pharmacyRegistrations");
            pharmacyObj.registrationDoc = file.destination;
        }
        if(pharmacyData.ownerDoc instanceof File){
           const file = await saveFile( pharmacyData.name , pharmacyData.registrationDoc , "/pharmacyOwners");
            pharmacyObj.ownerDoc = file.destination;
        }
        if(pharmacyData.addressDoc instanceof File){
            const file = await saveFile(pharmacyData.addressDoc , "/pharmacyOwners");
            pharmacyObj.addressDoc = file.destination;
        }if(pharmacyData.image instanceof File){
            const file = await saveFile(pharmacyData.image , "/pharmacyImages");
            pharmacyObj.img = file.destination;
        }
        const [pharmacy]  = await Pharmacies.save(pharmacyObj);
        
        //create pharmacist
        const [pharmacist] = await PharmacyStaff.save({
            role:"pharmacist",
            userId : customer.id,
            pharmacyId : pharmacy.id,
        })

        pharmacy.pharmacist = pharmacist,


        

        await Pharmacies.query("commit");

        return responseJson(res , 200 , {
            status:"success",
            results : pharmacy,
        });


    }catch(e){
        console.log(e);
        await Pharmacies.query('rollback');
        return responseJson(res , 400 , {
            status:"error",
            message:"pharmacy not created",
            error:e,
        })
    }
}




