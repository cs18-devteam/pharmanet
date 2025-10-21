const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminPharmacyVerify = async (req , res)=>{
    return response(res , view("admin.pharmacy.verify") , 200);
}


// ✅ (Optional) Verify / Approve pharmacy
exports.verifyPharmacy = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PHARMACY_SERVICE, {
            method: "PATCH",
        })
        .request(async (req, res) => {
            const { id, status } = JSON.parse(await getRequestData(req));
            return JSON.stringify({ id, status: status === "accept" ? "approved" : "rejected" });
        })
        .json()
        .resend((data) => {
            return view("admin.pharmacies.manage", {
                message: `Pharmacy ${data.status === "approved" ? "approved" : "rejected"} successfully`,
                data,
            });
        }, 200);
};