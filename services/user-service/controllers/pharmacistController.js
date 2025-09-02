const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../helpers/UserTypes");
const UserFactory = require("../models/UserFactory");
const Users = require("../models/UserModel");
const Pharmacists = require("../models/pharmacistModel");

exports.createPharmacist = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const newUser =await UserFactory.createUser(UserTypes.PHARMACIST , formData);

        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

exports.getPharmacist = async (req , res)=>{
    const id = req.params.get("id");
    let data = []
    if(!id){
        const pharmacists = await PharmacistModel.get();
        data = await pharmacists?.map(async (user)=>{
            const [userData] = await Users.getById(user.uid);
            return userData;
        });
        data =await Promise.all(data);
    }else{
        const pharmacist = await Pharmacists.getById(id);
        data = await Users.getById(pharmacist[0].uid)
    }
    
    res.writeHead(200 , {"content-type":"application/json"});
    res.write(JSON.stringify(data));
    res.end();
}

exports.updatePharmacist = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const updatedUser = await Pharmacists.update(formData);
        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(updatedUser));
        res.end();
    })
    
}

exports.deletePharmacist = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const deletedUser = await Pharmacists.deleteById(formData.id);
        if(deletedUser){
            res.writeHead(204);
            res.end();
        }else{
            res.write(JSON.stringify({status: "error"}))
            res.end();
        }
    })
}


