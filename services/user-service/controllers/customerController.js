const decodeMultipartFormData = require("../../../common/middlewares/decodeMultipartFormData");
const UserTypes = require("../helpers/UserTypes");
const UserFactory = require("../models/UserFactory");
const Customers = require("../models/customerModel");
const Users = require("../models/UserModel");


exports.createCustomer = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const newUser =await UserFactory.createUser(UserTypes.CUSTOMER , formData);

        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

exports.getCustomer = async (req , res)=>{
    const id = req.params.get("id");
    let data = []
    if(!id){
        const customers = await Customers.get();
        data = await customers?.map(async (user)=>{
            const [userData] = await Users.getById(user.uid);
            return userData;
        });
        data =await Promise.all(data);
    }else{
        const customer = await Customers.getById(id);
        data = await Users.getById(customer[0].uid)
    }
    
    res.writeHead(200 , {"content-type":"application/json"});
    res.write(JSON.stringify(data));
    res.end();
}

exports.updateCustomer = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const updatedUser = await Users.update(formData);
        res.writeHead(201 ,{ "Content-Type" : "application/json"});
        res.write(JSON.stringify(updatedUser));
        res.end();
    })
    
}

exports.deleteCustomer = async (req , res)=>{
    let data ;

    req.on('data' , (chunk)=>{
        data += chunk;
    })

    req.on('end' ,async ()=>{
        const formData =  decodeMultipartFormData(req, data);
        const deletedUser = await Users.deleteById(formData.id);
        if(deletedUser){
            res.writeHead(204);
            res.end();
        }else{
            res.write(JSON.stringify({status: "error"}))
            res.end();
        }
    })
}


