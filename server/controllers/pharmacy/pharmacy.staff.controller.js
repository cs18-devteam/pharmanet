const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");
const view = require("../../common/view");
const { apiCatchAsync } = require("../../common/catchAsync");
const getMultipartData = require("../../common/getMultipartData");


exports.renderCreateStaff = async(req, res) => {
    try{ 
    return response(res, view('pharmacy/pharmacy.dashboard'))
}catch(e){
    console.log(e);
    return responseJson(res , 400 , {
        status:"error",
        message :"create staff page doesnot loaded",
        error:e,

    })
}
}

exports.renderStaffOptions = async(req, res) =>{
    try{
        return response(res,view('staff/options'))
    }catch(e){
        console.log(e);
        return responseJson(res, 400 , {
            status: "error",
            message: "staff options page doesnot loaded",
            error: e,
        })
    }
}

exports.createStaffMember = apiCatchAsync(async (req , res)=>{

    const pharmacyId = req.pharmacyId;
    const reqData = (await getMultipartData(req));
    const userData = {
        firstName: reqData.firstName,
        lastName : reqData.lastName,
        email : reqData.email,
        password: reqData.password || "1234567890",
        nic: reqData.nic,
        fullName: reqData.fullName,
        dateOfBirth: reqData.dateOfBirth,
        addressNo : reqData.addressNo,
        street : reqData.street,
        town : reqData.town,
        province : reqData.province,
        postalCode : reqData.postalCode,
        bank : reqData.bank,
        accountNo : reqData.accountNo,
        bankBranch : reqData.bankBranch,
        userName : reqData.userName,
        role : reqData.role,
        pharmacyId : pharmacyId,
    };

    const [user] = await Users.save(userData);

    if(!user.id){
        throw new Error("user not created");
    }else{
        userData.userId = user.id;
    }

    const [newStaffMember] = await PharmacyStaff.save(userData);

    await Users.query('commit');


    return responseJson(res , 200 , {
        status:"success",
        results: {...user , userId : user.id ,...newStaffMember},
    })
})


exports.getStaffMembers = apiCatchAsync(async (req , res)=>{

    let members = await PharmacyStaff.get({pharmacyId : req.pharmacyId});

    members = members.map(async m=>{
        const [user] = await Users.getById(m.userId);
        return {...user , userId : user.id , ...m};
    })

    members = await Promise.all(members);

    return responseJson(res , 200 , {
        status:"success",
        results:members,
        count: members.length,
    })
})


exports.getStaffMember = apiCatchAsync(async (req , res)=>{
    const id = req.staffId;

    if(!id){
        throw new Error("no staff id provided");
    }
    const [member] = await PharmacyStaff.getById(id);
    const [user] = await Users.getById(member.userId);
        
    return responseJson(res , 200 , {
        status:"success",
        results:{...user , userId : user.id , staffId : member.id , ...member},
    })
})


exports.changePermissions = apiCatchAsync(async (req , res)=>{
    const staffId = req.staffId;

    const permissions = {
        
    }


    
})