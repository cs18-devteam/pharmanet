const { response } = require("../../common/response");
const view = require("../../common/view");
const { responseJson } = require("../../common/response");
const { apiCatchAsync } = require("../../common/catchAsync");
const getMultipartData = require("../../common/getMultipartData");
const File = require("../../common/File");
const Leaves = require("../../models/LeaveModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");

exports.renderPharmacyStaffLeave = async (req, res) => {
  try {
    return response(
      res,
      view("pharmacy.staff.leave", {
        header: view("component.header", {
          name: "Antibiotics",
        }),
        footer: view("footer"),
      }),
      200,
    );
  } catch (e) {
    console.log(e);
    return response(res, view("404"), 404);
  }
};

exports.createLeaveRequest = apiCatchAsync(async (req, res) => {
  const data = await getMultipartData(req);
  const staffId = data.staffId;


  if (!staffId) throw new Error("staffId is required");

  // Get userId from staffId
  const [staff] = await PharmacyStaff.getById(staffId);
  if (!staff) throw new Error("Staff member not found");
  const userId = staff.userId;

  const [user] = await Users.getById(userId);
  if(!user) throw new Error("User not found");


  if (!data.leaveType || !data.startDate || !data.endDate) {
    throw new Error("leaveType, startDate and endDate are required");
  }

  let documentPath = null;
  if (data.document instanceof File) {
    const file = data.document;
    const filename = `${userId}-${Date.now()}.${file.fileName.split(".").pop()}`;
    file.rename(filename);
    const saved = await file.save("/leave-documents");
    if (saved.status === "error")
      throw new Error("leave document upload failed");
    documentPath = `/leave-documents/${filename}`;
  }

  const leaveData = {
    user: userId, // Use userId instead of staffId
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    leaveType: data.leaveType,
    startDate: data.startDate,
    endDate: data.endDate,
    leaveCategory: data.leaveCategory,
    reason: data.reason,
    document: documentPath,
    coveredBy: data.coveredBy,
    status: "pending",
    requestedDate: new Date().toISOString().slice(0, 19).replace("T", " "),
  };

  const [created] = await Leaves.save(leaveData);

  return responseJson(res, 201, {
    status: "success",
    results: created,
  });
});

exports.getLeaveRequests = apiCatchAsync(async (req, res) => {
  const pharmacyID = req.pharmacyId;
  if (!pharmacyID) throw new Error("staffId is required");

  // Get userId from staffId
  const staff = await PharmacyStaff.get({
    pharmacyId : pharmacyID,
  });
  if (!staff.length) throw new Error("Staff member not found");

  let leavesOfAllMembers = await Promise.all(staff.map(async s=>{
    const staffId = s.id;
    const leaves = await Leaves.get({ user: staffId });
    return leaves;

  }))


  leavesOfAllMembers = leavesOfAllMembers.flat();

  // Get leaves for this user

  // Return leaves with firstName, lastName, role from database
  const results = leavesOfAllMembers.map(leave => ({
    ...leave,
    firstName: leave.firstName,
    lastName: leave.lastName,
    role: leave.role
  }));

  return responseJson(res, 200, {
    status: "success",
    results,
    count: results.length,
  });
});
