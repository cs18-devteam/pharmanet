const { apiCatchAsync } = require("../common/catchAsync");
const { responseJson } = require("../common/response");
const Pharmacies = require("../models/PharmacyModel");
const PharmacyStaff = require("../models/PharmacyStaffModel");
const Users = require("../models/UserModel");

exports.getUserProfileJsonData = apiCatchAsync(async (req , res)=>{
    const userId = req.userId;
    const [user] = await Users.getById(userId);

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