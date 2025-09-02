const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../helpers/UserTypes");
const pharmacyManagers = require("../models/systemPhamarcyManagerModel");
const UserFactory = require("../models/UserFactory");
const Users = require("../models/UserModel");



exports.createSystemPharmacyManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const newUser =await UserFactory.createUser(UserTypes.SYSTEM_PHARMACY_MANAGER , formData);

        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

exports.getSystemPharmacyManager = async (req , res)=>{
    const id = req.params.get("id");
    let data = []
    if(!id){
        const pharmacyManagers = await SystemPharmacyManagers.get();
        data = await pharmacyManagers?.map(async (user)=>{
            const [userData] = await Users.getById(user.uid);
            return userData;
        });
        data =await Promise.all(data);
    }else{
        const pharmacyManager = await SystemPharmacyManagers.getById(id);
        data = await Users.getById(pharmacyManager[0].uid)
    }
    
    res.writeHead(200 , {"content-type":"application/json"});
    res.write(JSON.stringify(data));
    res.end();
}

exports.updateSystemPharmacyManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const updatedUser = await SystemPharmacyManagers.update(formData);
        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(updatedUser));
        res.end();
    })
    
}

exports.deleteSystemPharmacyManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const deletedUser = await SystemPharmacyManagers.deleteById(formData.id);
        if(deletedUser){
            res.writeHead(204);
            res.end();
        }else{
            res.write(JSON.stringify({status: "error"}))
            res.end();
        }
    })
}


