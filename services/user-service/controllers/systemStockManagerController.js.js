const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../helpers/UserTypes");
const SystemAdminModel = require("../models/systemAdminModel");
const SystemPharmacyManagerModel = require("../models/systemPhamarcyManagerModel");
const SystemStockManagerModel = require("../models/systemStockManagerModel");
const UserFactory = require("../models/UserFactory");
const UserModel = require("../models/UserModel");
const Users = new UserModel();
const SystemStockManagers = new SystemStockManagerModel();

exports.createSystemStockManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const newUser =await UserFactory.createUser(UserTypes.SYSTEM_STOCK_MANAGER , formData);

        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

exports.getSystemStockManager = async (req , res)=>{
    const id = req.params.get("id");
    let data = []
    if(!id){
        const stockManagers = await SystemStockManagers.get();
        data = await stockManagers?.map(async (user)=>{
            const [userData] = await Users.getById(user.uid);
            return userData;
        });
        data =await Promise.all(data);
    }else{
        const stockManager = await SystemStockManagers.getById(id);
        data = await Users.getById(stockManager[0].uid)
    }
    
    res.writeHead(200 , {"content-type":"application/json"});
    res.write(JSON.stringify(data));
    res.end();
}

exports.updateSystemStockManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const updatedUser = await SystemStockManagers.update(formData);
        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(updatedUser));
        res.end();
    })
    
}

exports.deleteSystemStockManager = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const deletedUser = await SystemStockManagers.deleteById(formData.id);
        if(deletedUser){
            res.writeHead(204);
            res.end();
        }else{
            res.write(JSON.stringify({status: "error"}))
            res.end();
        }
    })
}


