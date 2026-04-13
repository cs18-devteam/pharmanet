const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");
const view = require("../../common/view");
const { apiCatchAsync } = require("../../common/catchAsync");
const getMultipartData = require("../../common/getMultipartData");
const { hashPassword } = require("../../common/Auth");
const readCookies = require("../../common/readCookies");

exports.renderCreateStaff = async (req, res) => {
  try {
    return response(res, view("pharmacy/pharmacy.dashboard"));
  } catch (e) {
    console.log(e);
    return responseJson(res, 400, {
      status: "error",
      message: "create staff page doesnot loaded",
      error: e,
    });
  }
};

exports.renderStaffOptions = async (req, res) => {
  try {
    return response(res, view("staff/options"));
  } catch (e) {
    console.log(e);
    return responseJson(res, 400, {
      status: "error",
      message: "staff options page doesnot loaded",
      error: e,
    });
  }
};

exports.createStaffMember = apiCatchAsync(async (req, res) => {
  const pharmacyId = req.pharmacyId;
  const reqData = await getMultipartData(req);
  const userData = {
    firstName: reqData.firstName,
    lastName: reqData.lastName,
    email: reqData.email,
    password: hashPassword("1234567890"),
    nic: reqData.nic,
    fullName: reqData.fullName,
    dateOfBirth: reqData.dateOfBirth,
    addressNo: reqData.addressNo,
    street: reqData.street,
    town: reqData.town,
    province: reqData.province,
    postalCode: reqData.postalCode,
    bank: reqData.bank,
    accountNo: reqData.accountNo,
    bankBranch: reqData.bankBranch,
    userName: reqData.userName,
    role: reqData.role,
    pharmacyId: pharmacyId,
  };

  const [user] = await Users.save(userData);

  if (!user.id) {
    throw new Error("user not created");
  } else {
    userData.userId = user.id;
  }

  const [newStaffMember] = await PharmacyStaff.save(userData);

  await Users.query("commit");
  

  return responseJson(res, 200, {
    status: "success",
    results: { ...user, userId: user.id, ...newStaffMember },
  });
});

exports.getStaffMembers = apiCatchAsync(async (req, res) => {
  let members = await PharmacyStaff.get({ pharmacyId: req.pharmacyId });
  members = members.map(async (m) => {
    
    const [staff] = await PharmacyStaff.getByVarId('userId',m.userId);
    const [user] = await Users.getById(staff.userId);
    const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
   

    
    return { ...staff, ...user, ...pharmacy, userId: user.id };
  });




  members = await Promise.all(members);
  


  return responseJson(res, 200, {
    status: "success",
    results: members,
    count: members.length,
  });
});

exports.getStaffMember = apiCatchAsync(async (req, res) => {
  const id = req.staffId;

  if (!id) {
    throw new Error("no staff id provided");
  }
  const [member] = await PharmacyStaff.getById(id);
  const [user] = await Users.getById(member.userId);

  return responseJson(res, 200, {
    status: "success",
    results: { ...member, ...user, userId: user.id, staffId: member.id  },
  });
});

exports.changePermissions = apiCatchAsync(async (req, res) => {
  
  const data = await getMultipartData(req);
  const {staffId} = readCookies(req);



  const permissionObj = {
    id: data.staffId,
    createOrder: data.createOrder == "on" ? "1" : "0",
    deleteOrder: data.deleteOrder == "on" ? "1" : "0",
    readOrder: data.readOrder == "on" ? "1" : "0",
    updateOrder: data.updateOrder == "on" ? "1" : "0",

    // transaction permissions

    readTransactions: data.readTransactions == "on" ? "1" : "0",

    // products permissions

    searchProducts: data.searchProducts == "on" ? "1" : "0",
    updateProducts: data.updateProducts == "on" ? "1" : "0",
    deleteProducts: data.deleteProducts == "on" ? "1" : "0",
    createProducts: data.createProducts == "on" ? "1" : "0",

    // medicine permission

    searchMedicines: data.searchMedicines == "on" ? "1" : "0",
    createMedicines: data.createMedicines == "on" ? "1" : "0",
    deleteMedicines: data.deleteMedicines == "on" ? "1" : "0",
    updateMedicines: data.updateMedicines == "on" ? "1" : "0",

    // staff permission
    searchStaff: data.searchStaff == "on" ? "1" : "0",
    deleteStaff: data.deleteStaff == "on" ? "1" : "0",
    createStaff: data.createStaff == "on" ? "1" : "0",
  };

  if(staffId != data.staffId){
    permissionObj.updateStaff =  data.updateStaff == "on"  ? "1" : "0";
  }

  const [staffMember] = await PharmacyStaff.update(permissionObj);

  return responseJson(res, 200, {
    status: "success",
    results: staffMember,
    count: 1,
  });
});

exports.updateStaffMember = apiCatchAsync(async (req, res) => {
  const staffId = req.staffId;

  console.log("Update staff request - staffId:", staffId);

  // Get the staff member
  const [staff] = await PharmacyStaff.getById(staffId);
  if (!staff) throw new Error("Staff member not found");

  console.log("Staff found:", staff);

  const userId = staff.userId;
  const data = await getMultipartData(req);
  const normalizedRole = data.role? String(data.role).trim().toLowerCase : undefined;
  if (!staffId) throw new Error("staffId is required");

  console.log("Received data:", data);

  // Update user data
  const userData = {
    id: userId,
    firstName: data.firstName || staff.firstName,
    lastName: data.lastName || staff.lastName,
    contact: data.contact,
    email: data.email,
    nic: data.nic,
    role: normalizedRole,
  };

  console.log("User data to update:", userData);

  // Remove undefined and empty fields
  Object.keys(userData).forEach(key => {
    if (userData[key] === undefined || userData[key] === "") {
      delete userData[key];
    }
  });

  console.log("Cleaned user data:", userData);

  // Verify we have data to update
  if (Object.keys(userData).length <= 1) {
    throw new Error("No valid data provided for update");
  }

  const [updatedUser] = await Users.update(userData);
  Users.update(userData);

  if (!updatedUser) {
    throw new Error("Failed to update user");
  }

  console.log("User updated:", updatedUser);

  return responseJson(res, 200, {
    status: "success",
    results: { ...updatedUser, userId: updatedUser.id || userId, staffId: staff.id },
  });
});



exports.resetPassword = apiCatchAsync(async (req , res)=>{
    const staffId = req.staffId;
    const [staff] = await PharmacyStaff.getById(staffId);
    if(!staff) throw new Error("staff member not found");

    await Users.update({
      id : staff.userId,
      password : hashPassword("1234567890")
    })

    return responseJson(res , 200 , {
      status:"success",
      message:"password reset successful",
    })
})

exports.deleteMember = apiCatchAsync(async (req , res)=>{
    const staffId = req.staffId;
    const [staff] = await PharmacyStaff.getById(staffId);
    if(!staff) throw new Error("staff member not found");

    await Users.deleteById(staff.userId);
    await PharmacyStaff.deleteById(staff.id);

    return responseJson(res , 200 , {
      status:"success",
      message:"user deleted successful",
    })
})