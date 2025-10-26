const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../helpers/UserTypes");
const UserFactory = require("../models/UserFactory");
const Users = require("../models/UserModel");
const PharmacyStockManagers = require("../models/pharmacyStockManagerModel");

exports.createPharmacyStockManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const newUser =await UserFactory.createUser(UserTypes.STOCK_MANAGER , formData);

        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

exports.getPharmacyStockManager = async (req , res)=>{
    const id = req.params.get("id");
    let data = []
    if(!id){
        const pharmacyStockManagers = await PharmacistModel.get();
        data = await pharmacyStockManagers?.map(async (user)=>{
            const [userData] = await Users.getById(user.uid);
            return userData;
        });
        data =await Promise.all(data);
    }else{
        const pharmacyStockManager = await PharmacyStockManagers.getById(id);
        data = await Users.getById(pharmacyStockManager[0].uid)
    }
    
    res.writeHead(200 , {"content-type":"application/json"});
    res.write(JSON.stringify(data));
    res.end();
}

exports.updatePharmacyStockManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const updatedUser = await PharmacyStockManagers.update(formData);
        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(updatedUser));
        res.end();
    })
    
}

exports.deletePharmacyStockManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const deletedUser = await PharmacyStockManagers.deleteById(formData.id);
        if(deletedUser){
            res.writeHead(204);
            res.end();
        }else{
            res.write(JSON.stringify({status: "error"}))
            res.end();
        }
    })
}


