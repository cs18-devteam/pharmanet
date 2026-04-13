const readCookies = require("../common/readCookies");
const { responseJson } = require("../common/response");
const Pharmacies = require("../models/PharmacyModel");

exports.checkPharmacyVerification = ()=>{
    return async (req , res , next)=>{
        try{
            const {pharmacyId} = readCookies(req);
            if(!pharmacyId) throw new Error("pharmacy id not found")
            const [phr] = await Pharmacies.getById(pharmacyId);
            if(!phr) throw new Error("pharmacy not found");
            if(!phr.status) throw new Error("You're not verified");
            return next();


        }catch(e){
            console.log(e);
            return responseJson(res, 401 , {
                status:"error",
                message: e.message || "You're not verified",
            })
            
        }
    }
}