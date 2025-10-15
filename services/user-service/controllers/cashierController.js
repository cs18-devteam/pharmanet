const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../helpers/UserTypes");
const UserFactory = require("../models/UserFactory");
const Users = require("../models/UserModel");
const Cashiers = require("../models/cashierModel");


exports.createCashier = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const newUser =await UserFactory.createUser(UserTypes.CASHIER , formData);

        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

exports.getCashier = async (req , res)=>{
    const id = req.params.get("id");
    let data = []
    if(!id){
        const cashier = await Cashiers.get();
        data = await cashier?.map(async (user)=>{
            const [userData] = await Users.getById(user.uid);
            return userData;
        });
        data =await Promise.all(data);
    }else{
        const cashier = await Cashiers.getById(id);
        data = await Users.getById(cashier[0].uid)
    }
    
    res.writeHead(200 , {"content-type":"application/json"});
    res.write(JSON.stringify(data));
    res.end();
}

exports.updateCashier = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const updatedUser = await Cashiers.update(formData);
        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(updatedUser));
        res.end();
    })
    
}

exports.deleteCashier = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const deletedUser = await Cashiers.deleteById(formData.id);
        if(deletedUser){
            res.writeHead(204);
            res.end();
        }else{
            res.write(JSON.stringify({status: "error"}))
            res.end();
        }
    })
}


