const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");
const view = require("../../common/view");


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

exports.createStaffMember = async (req , res)=>{
    await Users.query("start transaction");
    try{
        const reqData = JSON.parse(await getRequestData(req));
        const userData = {
            firstName: reqData.firstName,
            lastName : reqData.lastName,
            email : reqData.email,
            password: reqData.password,
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
            pharmacyId : reqData.pharmacyId,
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
    }catch(e){
        console.log(e);
        await Users.query('rollback');
        return responseJson(res , 400 , {
            status:"error",
            message:"staff member not created",
            error:e,
        })
    }
}


exports.getStaffMembers = async (req , res)=>{
    try{
        const id = req.params.get('id');

        let members = [];

        if(!id){
            members = await PharmacyStaff.get();
        }else{
            members = await PharmacyStaff.getById(id);
        }

        members = members.map(async m=>{
            console.log(m);
            const user = await Users.getById(m.userId);
            return {...user , userId : user.id , ...m};
        })

        members = await Promise.all(members);

        return responseJson(res , 200 , {
            status:"success",
            results:members,
            count: members.length,
        })

    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message :"something went wrong",
            error:e,

        })
    }
}