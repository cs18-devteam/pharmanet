const { getRequestData } = require("../../common/getRequestData");
const { responseJson, response } = require("../../common/response");
const view = require("../../common/view");
const Pharmacies = require("../../models/PharmacyModel");

exports.pharmacy = async (req ,res)=>{
    const pharmacies = await Pharmacies.get();


    return response(res , 
        view('admin/pharmacy',{
            header : view('component.header' , {
          name:"Pharmacies || Pharmanet Pharmacy Management",
        }),
            sidebar : view('admin/component.sidebar'),
            rows : pharmacies.map(p=>view('admin/component.pharmacy.row' , p)).join(" ")
        }) , 200 )
}


        

exports.createPharmacy = async (req , res)=>{
    let sent = false;
    

    try{

        const {
        name ,
        licenseNumber ,
        email,
        addressNo,
        street,
        town,
        province, 
        latitude ,
        longitude,
        googleMapLink,
        contact ,
        postalCode,
        pharmacist,
        type} = JSON.parse(await getRequestData(req));

        //const search for duplicate email
        const pharmacy = await Pharmacies.get({email, email});
        if(pharmacy.length > 0){
            console.log('duplicate pharmacy email')
            return responseJson(res , 400 , {
                status:"error",
                message :"duplicate email address",
                field : 'email',
            })
        }

        console.log(name)


    
        const results = await Pharmacies.save({
            name , 
            licenseNumber , 
            email,
            addressNo,
            street,
            town,
            province,
            latitude,
            longitude,
            googleMapLink,
            contact,
            postalCode,
            pharmacist,
            type
        });

        

        return responseJson(res ,201, results );

    }catch(e){
        console.log(e);
        return !sent && response(res , 200 , JSON.stringify({
            status:"error",
            error : e,
        }))
    }





}
exports.updatePharmacy = async (req , res)=>{
    let sent = false;

    try{

        const data = JSON.parse(await getRequestData(req));
        const updatedPharmacy = await Pharmacies.update(data);
        return sent=true && response(res , JSON.stringify(updatedPharmacy) , 200 );

    }catch(e){
        console.log(e);
        return !sent && response(res , 200 , JSON.stringify({
            status:"error",
            error : e,
        }))
    }





}

exports.pharmacyList = async (req , res)=>{
    try{
        const allPharmacies = await Pharmacies.get();
        return response(res , JSON.stringify(allPharmacies) , 200);
    }catch(e){
        console.log(e);
        return response(res , JSON.stringify(e) , 400);
    }
}

exports.getPharmacyDetails = async (req , res)=>{
    try{
        if(req.pharmacyId){

            
            const pharmacy =await Pharmacies.getById(req.pharmacyId);

            if(!pharmacy){
                return response(res , '<script>window.location.href="/admin/pharmacy"</script>')
            }

            return response(res , view('admin/pharmacy.details' , pharmacy[0]) , 200);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}


exports.deletePharmacy = async (req , res)=>{
    try{

        console.log({pharmacyId : req.pharmacyId})
        if(req.pharmacyId){
            const deleteLog = await Pharmacies.deleteById(req.pharmacyId);

            return response(res , JSON.stringify({
                status:"success",
            }) , 204);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}


exports.adminAddPharmacy = async (req ,res)=>{
    return response(res , view('admin/addPharmacy',{
        header : view('component.header' , {
            name:"Add new Pharmacy | step 01",
        }),
        next : "/admin/pharmacy/step/2"

    }) , 200);
}
exports.adminAddPharmacyStep02 = async (req ,res)=>{
    return response(res , view('admin/addPharmacy-step2',{
        header : view('component.header' , {
          name:"Add new Pharmacy | step 02",
        }),
        next: "/admin/pharmacy/step/3",
        previous:"/admin/pharmacy/create"
    }) , 200);
}
exports.adminAddPharmacyStep03 = async (req ,res)=>{
    return response(res , view('admin/addPharmacy-step3',{
        header : view('component.header' , {
          name:"Add new Pharmacy | step 03",
        }),
        next:"/admin/pharmacy/step/4",
        previous:"/admin/pharmacy/step/2"
    }) , 200);
}
exports.adminAddPharmacyStep04 = async (req ,res)=>{
    return response(res , view('admin/addPharmacy-step4',{
        header : view('component.header' , {
          name:"Add new Pharmacy | step 04",
        }),
        previous:"/admin/pharmacy/step/3"
        // next:"/admin/pharmacy/step/2"
    }) , 200);
}

exports.adminEditPharmacy = async (req ,res)=>{
     try{
        if(req.pharmacyId){

            const [pharmacy] = await Pharmacies.getById(req.pharmacyId);


        return response(res , view('admin/editPharmacy' ,{
            header : view('component.header' , {
                name:"Edit Pharmacy | step 01",
            }),
            sidebar : view('admin/component.sidebar') , ...pharmacy
    } ) , 200);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}
exports.adminEditPharmacyStep02 = async (req ,res)=>{
        try{
        if(req.pharmacyId){

            const [pharmacy] = await Pharmacies.getById(req.pharmacyId);


            return response(res , view('admin/editPharmacy-step2' , {
                header : view('component.header' , {
                    name:"Edit Pharmacy | step 02",
                }),
                ...pharmacy[0]
            }) , 200);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}
exports.adminEditPharmacyStep03 = async (req ,res)=>{
         try{
        if(req.pharmacyId){

           const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
            return response(res , view('admin/editPharmacy-step3' , {
                header : view('component.header' , {
                    name:"Edit Pharmacy | step 03",
                }),
                ...pharmacy[0]
            }) , 200);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}
exports.adminEditPharmacyStep04 = async (req ,res)=>{
    try{
        if(req.pharmacyId){
            const [pharmacy] = await Pharmacies.getById(req.pharmacyId);

            return response(res , view('admin/editPharmacy-step4' , {
                header : view('component.header' , {
                    name:"Edit Pharmacy | step 04",
                }),
                id: pharmacy.id,
                ...pharmacy,
            }) , 200);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}
