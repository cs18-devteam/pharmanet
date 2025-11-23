const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Users = require("../../model/UserModel");
const db = Database.getInstance();

exports.adminAddPharmacy = async (req ,res)=>{
    return response(res , view('admin/addPharmacy') , 200);
}
exports.adminAddPharmacyStep02 = async (req ,res)=>{
    return response(res , view('admin/addPharmacy-step2') , 200);
}
exports.adminAddPharmacyStep03 = async (req ,res)=>{
    return response(res , view('admin/addPharmacy-step3') , 200);
}
exports.adminAddPharmacyStep04 = async (req ,res)=>{
    return response(res , view('admin/addPharmacy-step4') , 200);
}

exports.adminEditPharmacy = async (req ,res)=>{
     try{
        if(req.pharmacyId){

            const respond =await fetch(`${Bridge.registry.PHARMACY_SERVICE}?id=${req.pharmacyId}`);
            const results = await respond.json();

            const pharmacy = results.data[0];


            return response(res , view('admin/editPharmacy' ,{
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

            const respond =await fetch(`${Bridge.registry.PHARMACY_SERVICE}?id=${req.pharmacyId}`);
            const results = await respond.json();

            const pharmacy = results.data[0];


            return response(res , view('admin/editPharmacy-step2' , pharmacy) , 200);
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

            const respond =await fetch(`${Bridge.registry.PHARMACY_SERVICE}?id=${req.pharmacyId}`);
            const results = await respond.json();

            const pharmacy = results.data[0];


            return response(res , view('admin/editPharmacy-step3' , pharmacy) , 200);
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

            const respond =await fetch(`${Bridge.registry.PHARMACY_SERVICE}?id=${req.pharmacyId}`);
            const results = await respond.json();

            const pharmacy = results.data[0];


            return response(res , view('admin/editPharmacy-step4' , pharmacy) , 200);
        }else{
            return response(res , JSON.stringify({}) , 200);
        }

        }catch(e){

            console.log(e);
            return response(res , JSON.stringify(e) , 400);
        }
}

exports.adminDashboard = async (req , res)=>{
    return response(res , view('admin/adminDashboard' , {
        sidebar : view('admin/component.sidebar')
    }) , 200);
}

exports.adminPharmacy = async(req,res)=>{
    return response(res, view('admin/pharmacy', {
        sidebar : view('admin/component.sidebar')
    }),200);
}

exports.medicines = async (req ,res)=>{
    return response(res , view('admin/medicines',{
        sidebar : view('admin/component.sidebar')
    }) , 200);
}

exports.dataAssets = async (req ,res)=>{
    return response(res , view('admin/dataAssets',{
        sidebar : view('admin/component.sidebar')
    }) , 200);
}

exports.viewProfile = async(req ,res)=>{
    return response(res, view('admin/viewProfile'), 200);
}

exports.pharmacy = async (req ,res)=>{
    return response(res , view('admin/pharmacy',{
        sidebar : view('admin/component.sidebar')
    }) , 200 );
}

exports.users = async (req ,res)=>{
    return response(res , view('admin/users',{
        sidebar : view('admin/component.sidebar')
    }) , 200);
}

exports.addUsers = async (req ,res)=>{
    return response(res, view('admin/addUsers') , 200);
}

//create User
exports.createUser = async (req,res) => {
    const { name, email, pharmacy, role} = JSON.parse(await getRequestData(req));
    const newUser = await Users.save({
        name, email , pharmacy , role
    });
    return responseJson(res , 201 , newUser);
}

//get all users
exports.getAllBlogs = async (req, res) => {
    const users = await Users.get()
    return responseJson(res , 200 , newBlog);
}


exports.createPharmacy = async (req , res)=>{
    let sent = false;

    try{

        const data = JSON.parse(await getRequestData(req));
        console.log(data);
        const respond = await fetch(Bridge.registry.PHARMACY_SERVICE , {
            method:"POST",
            body : JSON.stringify(data),
        });
        const results = await respond.json();
        return sent=true && response(res , JSON.stringify(results) , 201 );

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
        console.log(data);
        const respond = await fetch(Bridge.registry.PHARMACY_SERVICE , {
            method:"PATCH",
            body : JSON.stringify({...data , id :req.pharmacyId}),
        });
        const results = await respond.json();

        console.log(results)
        return sent=true && response(res , JSON.stringify(results) , 200 );

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
        const respond =await fetch(Bridge.registry.PHARMACY_SERVICE);
        const results = await respond.json();
        return response(res , JSON.stringify(results) , 200);
    }catch(e){
        console.log(e);
        return response(res , JSON.stringify(e) , 400);
    }
}

exports.getPharmacyDetails = async (req , res)=>{
    try{
        if(req.pharmacyId){

            const respond =await fetch(`${Bridge.registry.PHARMACY_SERVICE}?id=${req.pharmacyId}`);
            const results = await respond.json();

            const pharmacy = results.data[0];

            if(!pharmacy){
                return response(res , '<script>window.location.href="/admin/pharmacy"</script>')
            }

            return response(res , view('admin/pharmacy.details' , pharmacy) , 200);
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

            const respond =await fetch(Bridge.registry.PHARMACY_SERVICE , {
                method:"DELETE" , 
                body : JSON.stringify({
                    id : req.pharmacyId,
                })
            });

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