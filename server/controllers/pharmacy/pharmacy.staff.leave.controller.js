const { response } = require("../../common/response")
const view = require("../../common/view")
const { responseJson } = require("../../common/response");
const { apiCatchAsync } = require("../../common/catchAsync");
const getMultipartData = require("../../common/getMultipartData");
const File = require("../../common/File");
const Leaves = require("../../models/LeaveModel");

exports.renderPharmacyStaffLeave = async (req, res) =>{
    try{

        return response(res,view("pharmacy.staff.leave" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            footer: view('footer'),
        }),200)
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}

exports.createLeaveRequest = apiCatchAsync(async (req, res) => {
    const staffId = req.staffId || req.user?.id;
    if (!staffId) throw new Error("staffId is required");

    const data = await getMultipartData(req);

    if (!data.leaveType || !data.startDate || !data.endDate) {
        throw new Error("leaveType, startDate and endDate are required");
    }

    let documentPath;
    if (data.document instanceof File) {
        const file = data.document;
        const filename = `${staffId}-${Date.now()}.${file.fileName.split('.').slice(-1)}`;
        file.rename(filename);
        const saved = await file.save("/leave-documents");
        if (saved.status === "error") throw new Error("leave document upload failed");
        documentPath = `/leave-documents/${filename}`;
    }

    const leaveData = {
        user: staffId,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        leaveCategory: data.leaveCategory,
        reason: data.reason,
        document: documentPath,
        coveredBy: data.coveredBy,
        status: "pending",
        requestedDate: new Date().toISOString().slice(0, 19).replace("T", " ")
    };

    const [created] = await Leaves.save(leaveData);

    return responseJson(res, 201, {
        status: "success",
        results: created,
    });
});

exports.getLeaveRequests = apiCatchAsync(async (req, res) => {
    const staffId = req.staffId || req.user?.id;
    if (!staffId) throw new Error("staffId is required");

    const results = await Leaves.get({ user: staffId });

    return responseJson(res, 200, {
        status: "success",
        results,
        count: results.length,
    });
});