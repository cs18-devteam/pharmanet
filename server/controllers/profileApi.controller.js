const { apiCatchAsync } = require("../common/catchAsync");
const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Pharmacies = require("../models/PharmacyModel");
const PharmacyStaff = require("../models/PharmacyStaffModel");
const Users = require("../models/UserModel");

exports.getUserProfileJsonData = apiCatchAsync(async (req , res)=>{
    const userId = req.userId;
    if (!userId || isNaN(userId)) {
        return responseJson(res, 400, {
            status: "error",
            message: "Invalid or missing user ID",
        });
    }
    const [user] = await Users.getById(userId);
    if (!user) {
        return responseJson(res, 404, {
            status: "error",
            message: "User not found",
        });
    }

    return responseJson(res , 200 , {
        status:"success",
        results: user,
    })
})


exports.getPharmacyProfileJsonData = apiCatchAsync(async (req , res)=>{
    const pharmacyId = req.pharmacyId;
    const [pharmacy] = await Pharmacies.getById(pharmacyId);

    return responseJson(res , 200 , {
        status:"success",
        results: pharmacy,
    })
})


exports.getStaffData = apiCatchAsync(async (req , res)=>{
    const pharmacyId = req.pharmacyId;
    const staffId = req.staffId;

    const [staff] = await PharmacyStaff.getById(staffId);

    return responseJson(res , 200 , {
        status:"success",
        results: staff,
    })
})


exports.deleteProfile = apiCatchAsync(async (req , res)=>{
    const userId = req.userId;
    const [user] = await Users.getById(userId);
    
    if(!user) throw new Error("Can't find user");
    await Users.deleteById(userId);

    return responseJson(res , 201 , {
        status:"success",
        message:"account deleted successfully",
    });
})

exports.updateProfile = apiCatchAsync(async (req , res)=>{
    const userId = req.userId;
    const [user] = await Users.getById(userId);
    const data = JSON.parse(await getRequestData(req));

    console.log(data);

    if(!user) throw new Error("Account not found");
    const updatedUser = await Users.update({
        id: user.id,
        firstName : data.firstName, 
        lastName : data.lastName,
        addressNo : data.addressNo,
        street: data.street,
        town: data.town,
        province : data.province,  
    })

    return responseJson(res , 200 , {
        status:"success",
        message : "user updated successfully",
    })

    
})